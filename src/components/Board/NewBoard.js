import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { createBoard } from "../../apis/border";

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

const NewBoard = ({ setWriteOpen }) => {
  const [wTitle, setWTitle] = useState("");
  const [wContent, setWContent] = useState("");
  const [wUserName, setUserName] = useState("");
  const [wPassword, setPassword] = useState("");

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
  return (
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
  );
};

export default NewBoard;
