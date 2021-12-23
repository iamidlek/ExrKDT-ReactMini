import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const LoginForm = ({ setToggle }) => {
  const tryLogin = async (e) => {
    e.preventDefault();
    //! 로그인 및 성공시 카트 아이디 발급 등 필요 처리 있음
    // if (res) {
    //   Swal.fire("가입 완료", "가입한 정보로 로그인 해주세요", "success");
    //   setToggle(true);
    // }
  };
  return (
    <Box component="form" onSubmit={tryLogin}>
      <Grid container style={{ textAlign: "center", maxWidth: 830 }}>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ marginBottom: 2, marginTop: 2 }}
          >
            로그인
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <TextField
            id="id"
            sx={{ backgroundColor: "white", width: "300px" }}
            label="e-mail"
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            id="password"
            type="password"
            sx={{ backgroundColor: "white", width: "300px" }}
            label="password"
          />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <Button
            type="submit"
            variant="outlined"
            sx={{ width: "300px", height: "100%", backgroundColor: "white" }}
          >
            로그인
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <Button
            color="success"
            type="button"
            variant="outlined"
            sx={{ width: "300px", height: "100%", backgroundColor: "white" }}
            onClick={() => {
              setToggle(false);
            }}
          >
            회원 가입
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
