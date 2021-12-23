import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userAuth } from "../../atoms";
import Swal from "sweetalert2";
import { changePassword, checkPassword } from "../../apis/user";

const MyPassword = () => {
  const [aprove, setAprove] = useState(true);
  const [newPw, setNewPw] = useState("");

  const auth = useRecoilValue(userAuth);

  const changePw = async () => {
    const res = await changePassword(auth.user_email, newPw);
    if (res) {
      Swal.fire(
        "비밀번호 변경 성공",
        "수정한 비밀번호로 반영되었습니다",
        "success"
      );
    } else {
      Swal.fire("비밀번호 변경 실패", "다시 한번 시도해 주세요", "error");
    }
  };

  const checkPw = async (pw) => {
    const res = await checkPassword(auth.user_email, pw);
    if (res) {
      setAprove(false);
    } else {
      setAprove(true);
    }
  };
  return (
    <Grid container style={{ textAlign: "center" }}>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="currpass"
          type="password"
          onChange={(e) => checkPw(e.target.value)}
          sx={{ backgroundColor: "white", width: "300px" }}
          label="기존 비밀 번호"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="newpass"
          type="password"
          disabled={aprove}
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          sx={{ backgroundColor: "white", width: "300px" }}
          label="새로운 비밀 번호"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Button
          type="button"
          variant="outlined"
          disabled={aprove || newPw.length < 8}
          sx={{
            width: "300px",
            height: "100%",
            backgroundColor: "white",
          }}
          onClick={changePw}
        >
          비밀 번호 변경
        </Button>
      </Grid>
    </Grid>
  );
};

export default MyPassword;
