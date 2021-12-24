import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../apis/user";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { userAuth } from "../../atoms";
import { useNavigate } from "react-router";
import { getMyCartId } from "../../apis/cart";

const LoginForm = ({ setToggle }) => {
  const setAuth = useSetRecoilState(userAuth);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const tryLogin = async ({ email, password }) => {
    const data = await login(email, password);
    if (data) {
      const cart_id = await getMyCartId(data.user_email);
      setAuth((info) => ({
        ...info,
        user_email: data.user_email,
        user_password: data.user_password,
        cart_id,
      }));
      Swal.fire("로그인에 성공하였습니다", "", "success", "닫기");
      navigation("/");
    } else {
      Swal.fire(
        "아이디 또는 비밀번호가 일치하지 않습니다.",
        "",
        "error",
        "닫기"
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(tryLogin)}>
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
          <FormControl
            sx={{ m: 1, width: "300px", backgroundColor: "white" }}
            variant="outlined"
            error={Boolean(errors?.email)}
          >
            <InputLabel htmlFor="email">e-mail</InputLabel>
            <OutlinedInput
              id="email"
              type="text"
              {...register("email", {
                required: "이메일 입력이 필요합니다",
                validate: {
                  check: (value) =>
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
                      value
                    )
                      ? true
                      : "이메일 형식이 맞지 않습니다",
                },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Visibility />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>{errors?.email?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <FormControl
            sx={{ m: 1, width: "300px", backgroundColor: "white" }}
            variant="outlined"
            error={Boolean(errors?.password)}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호 입력이 필요합니다",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자리 이상으로 설정해 주세요.",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 20자리 이하로 설정해 주세요.",
                },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <VisibilityOff />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>{errors?.password?.message}</FormHelperText>
          </FormControl>
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
