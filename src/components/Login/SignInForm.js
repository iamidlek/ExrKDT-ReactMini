import { Button, Grid, TextField, Typography } from "@mui/material";
import { checkExistEmail, createID } from "../../apis/user";
import Swal from "sweetalert2";
import { useState } from "react";

const SignInForm = ({ setToggle }) => {
  const [email, setEmail] = useState("");
  const [emailmessage, setEmailmessage] = useState(true);

  const checkEmail = async () => {
    const res = await checkExistEmail(email);
    if (res === 1) {
      // console.log("이미 존재하는 이메일");
      setEmailmessage(true);
    } else {
      // console.log("가입 가능");
      setEmailmessage(false);
    }
  };
  const tryLogin = async (e) => {
    e.preventDefault();
    const { target } = e;
    const [user_email1, user_email2] = email.split("@");
    const res = await createID({
      user_email1,
      user_email2,
      user_password: target.password.value,
      user_major: target.major.value,
      user_phone: target.phone.value,
      user_name: target.name.value,
      user_org: target.org.value,
    });
    if (res) {
      Swal.fire("가입 완료", "가입한 정보로 로그인 해주세요", "success");
      setEmail("");
      setToggle(true);
    }
  };
  return (
    <Grid container style={{ textAlign: "center", maxWidth: 830 }}>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          회원가입
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "white", width: "300px" }}
          label="e-mail"
          error={emailmessage}
          helperText={
            email
              ? emailmessage && "사용가능한 이메일을 사용하세요"
              : "이메일을 입력하세요"
          }
        />
        <Button
          color="success"
          type="button"
          variant="outlined"
          sx={{
            width: "40px",
            height: "6%",
            marginLeft: "10px",
            backgroundColor: "white",
            position: "absolute",
          }}
          onClick={checkEmail}
        >
          확인
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          id="password"
          type="password"
          disabled={emailmessage}
          sx={{ backgroundColor: "white", width: "300px" }}
          label="password"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="major"
          sx={{ backgroundColor: "white", width: "300px" }}
          label="major"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="phone"
          sx={{ backgroundColor: "white", width: "300px" }}
          label="phone"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <TextField
          id="name"
          sx={{ backgroundColor: "white", width: "300px" }}
          label="name"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          id="org"
          sx={{ backgroundColor: "white", width: "300px" }}
          label="org"
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Button
          type="button"
          variant="outlined"
          onClick={(e) => tryLogin(e)}
          disabled={emailmessage}
          sx={{ width: "300px", height: "100%", backgroundColor: "white" }}
        >
          회원 가입
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Button
          color="success"
          type="button"
          variant="outlined"
          sx={{ width: "300px", height: "100%", backgroundColor: "white" }}
          onClick={() => {
            setEmail("");
            setToggle(true);
          }}
        >
          로그인
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
