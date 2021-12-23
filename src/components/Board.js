import { Grid, Pagination, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { boardTotal, boardPage, searchBoardContent } from "../apis/border";
import BoardList from "./Board/BoardList";
import NewBoard from "./Board/NewBoard";

const Board = () => {
  const [total, setTotal] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [writeOpen, setWriteOpen] = useState(false);

  const pageNation = async (page) => {
    const data = await boardPage(page);
    setBoardList(data);
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
      setBoardList(data);
    }, 700);
    setTimer(newTimer);
  };

  useEffect(() => {
    if (writeOpen) return;
    (async () => {
      const count = await boardTotal();
      const data = await boardPage(1);
      setTotal(count);
      setBoardList(data);
    })();
  }, [writeOpen]);

  return (
    <>
      <Modal open={writeOpen} onClose={() => setWriteOpen(false)}>
        <NewBoard setWriteOpen={setWriteOpen} />
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
      <BoardList boardList={boardList} />
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
