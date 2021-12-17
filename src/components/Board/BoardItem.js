import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBoard, visitBoard } from "../../apis/border";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const BoardItem = () => {
  const {
    state: { board },
  } = useLocation();
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [wTitle, setWTitle] = useState("");
  const [wContent, setWContent] = useState("");
  const [wUserName, setUserName] = useState("");
  const [wPassword, setPassword] = useState("");

  const [cPassword, setCpassword] = useState("");

  const editBoard = () => {
    createBoard({
      id,
      title: wTitle,
      content: wContent,
      insert_user: wUserName,
      write_password: wPassword,
    });
    nav("/");
  };

  useEffect(() => {
    setId(board.id);
    setWTitle(board.title);
    setWContent(board.content);
    setUserName(board.insert_user);
    setPassword(board.write_password);
    visitBoard(board.id);
  }, []);
  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        확인 및 수정하기
      </Typography>
      <TextField
        id="title"
        label="Title"
        value={wTitle}
        onChange={(e) => setWTitle(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <TextField
        id="content"
        label="Content"
        multiline
        value={wContent}
        onChange={(e) => setWContent(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <TextField
        id="username"
        label="User Name"
        disabled
        value={wUserName}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <TextField
        id="password"
        label="Password"
        error={cPassword !== wPassword}
        value={cPassword}
        type="password"
        onChange={(e) => setCpassword(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <Box>
        <Button
          variant="outlined"
          disabled={cPassword !== wPassword}
          onClick={editBoard}
          style={{ marginTop: "36px", marginRight: "24px" }}
        >
          수정하기
        </Button>

        <Button
          variant="outlined"
          onClick={() => nav("/")}
          style={{ marginTop: "36px", marginRight: "24px" }}
        >
          닫기
        </Button>
      </Box>
    </Box>
  );
};

export default BoardItem;
