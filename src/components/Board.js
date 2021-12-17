import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Pagination,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  boardTotal,
  boardPage,
  createBoard,
  searchBoardContent,
} from "../apis/border";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Board = () => {
  const [total, setTotal] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [writeOpen, setWriteOpen] = useState(false);

  const [wTitle, setWTitle] = useState("");
  const [wContent, setWContent] = useState("");
  const [wUserName, setUserName] = useState("");
  const [wPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const pageNation = async (page) => {
    const data = await boardPage(page);
    setBoardList(data);
  };

  const addBoard = () => {
    createBoard({
      title: wTitle,
      content: wContent,
      insert_user: wUserName,
      write_password: wPassword,
    });
    setWTitle("");
    setWContent("");
    setUserName("");
    setPassword("");
    setWriteOpen(false);
  };
  const [timer, setTimer] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const search = async (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (e.target.value !== "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
      const data = await boardPage(1);
      setBoardList(data);
      return;
    }
    const newTimer = setTimeout(async () => {
      const data = await searchBoardContent(e.target.value);
      console.log(data);
      setBoardList(data);
    }, 700);
    setTimer(newTimer);
  };

  useEffect(() => {
    (async () => {
      const count = await boardTotal();
      const data = await boardPage(1);
      setTotal(count);
      setBoardList(data);
    })();
  }, []);

  return (
    <>
      <Modal open={writeOpen} onClose={() => setWriteOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            새로운 글 쓰기
          </Typography>
          <TextField
            id="title"
            required
            label="Title"
            value={wTitle}
            onChange={(e) => setWTitle(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
            autoComplete="off"
          />
          <TextField
            id="content"
            required
            multiline
            label="Content"
            value={wContent}
            onChange={(e) => setWContent(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
            autoComplete="off"
          />
          <TextField
            id="username"
            required
            label="User Name"
            value={wUserName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
            autoComplete="off"
          />
          <TextField
            id="password"
            required
            label="Password"
            value={wPassword}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mt: 2, width: "100%" }}
            autoComplete="off"
          />
          <Button
            variant="outlined"
            onClick={addBoard}
            style={{ marginTop: "36px" }}
          >
            등록하기
          </Button>
        </Box>
      </Modal>
      <Grid container style={{ textAlign: "right", marginBottom: "16px" }}>
        <Grid item xs={9}>
          <TextField
            label="내용 검색"
            onChange={search}
            variant="standard"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            onClick={() => setWriteOpen(true)}
            style={{ marginRight: "36px" }}
          >
            글쓰기
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
        <Grid item xs={2}>
          <ListItemText primary="유저명" />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary="제목" />
        </Grid>
        <Grid item xs={2}>
          <ListItemText primary="조회" />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary="작성일" />
        </Grid>
      </Grid>
      <Box>
        <List style={{ borderTop: "1px solid #ccc" }}>
          {boardList?.map((board) => (
            <ListItem
              disablePadding
              key={board.id}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <Grid
                container
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <Grid item xs={2}>
                  <ListItemText primary={board.insert_user} />
                </Grid>
                <Grid item xs={5}>
                  <ListItemButton style={{ textAlign: "center" }}>
                    <ListItemText
                      onClick={() =>
                        navigate(`/${board.id}`, { state: { board } })
                      }
                      primary={board.title}
                    />
                  </ListItemButton>
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={board.view_count} />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText primary={board.insert_date.slice(0, 10)} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
      {!isSearch && (
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
          count={total ? Math.ceil(total / 10) : 1}
          color="secondary"
          showFirstButton
          showLastButton
          onChange={(event, page) => pageNation(page)}
        />
      )}
    </>
  );
};

export default Board;
