import {
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
import { checkExistEmail, createID } from "../../apis/user";
import Swal from "sweetalert2";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignInForm = ({ setToggle }) => {
  const [emailmessage, setEmailmessage] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const currEmail = watch("email");
  const checkEmail = async () => {
    const res = await checkExistEmail(currEmail);
    if (res === 1) {
      // console.log("이미 존재하는 이메일");
      setEmailmessage(true);
    } else {
      // console.log("가입 가능");
      setEmailmessage(false);
    }
  };
  const signUp = async (data) => {
    const { email, password, major, phone, name, org } = data;
    const [user_email1, user_email2] = email.split("@");
    const res = await createID({
      user_email1,
      user_email2,
      user_password: password,
      user_major: major,
      user_phone: phone,
      user_name: name,
      user_org: org,
    });
    if (res) {
      Swal.fire("가입 완료", "가입한 정보로 로그인 해주세요", "success");
      setToggle(true);
    }
  };
  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(signUp)}
      style={{ textAlign: "center", maxWidth: 830 }}
    >
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          회원가입
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1, position: "relative" }}>
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
        <Button
          color="success"
          type="button"
          variant="outlined"
          sx={{
            width: "40px",
            height: "70%",
            top: 10,
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
        <FormControl
          sx={{ m: 1, width: "300px", backgroundColor: "white" }}
          variant="outlined"
          error={Boolean(errors?.password)}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            disabled={emailmessage}
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
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <FormControl
          sx={{ m: 1, width: "300px", backgroundColor: "white" }}
          variant="outlined"
          error={Boolean(errors?.major)}
        >
          <InputLabel htmlFor="major">Major</InputLabel>
          <OutlinedInput
            id="major"
            type="text"
            {...register("major", {
              required: "입력이 필요합니다",
              maxLength: {
                value: 20,
                message: "20자리 이하로 설정해 주세요.",
              },
            })}
            label="major"
          />
          <FormHelperText>{errors?.major?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <FormControl
          sx={{ m: 1, width: "300px", backgroundColor: "white" }}
          variant="outlined"
          error={Boolean(errors?.name)}
        >
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            id="name"
            type="text"
            {...register("name", {
              required: "입력이 필요합니다",
              maxLength: {
                value: 20,
                message: "20자리 이하로 설정해 주세요.",
              },
            })}
            label="name"
          />
          <FormHelperText>{errors?.name?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <FormControl
          sx={{ m: 1, width: "300px", backgroundColor: "white" }}
          variant="outlined"
          error={Boolean(errors?.phone)}
        >
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <OutlinedInput
            id="phone"
            type="number"
            {...register("phone", {
              required: "입력이 필요합니다",
              maxLength: {
                value: 20,
                message: "20자리 이하로 설정해 주세요.",
              },
            })}
            label="phone"
          />
          <FormHelperText>{errors?.phone?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <FormControl
          sx={{ m: 1, width: "300px", backgroundColor: "white" }}
          variant="outlined"
          error={Boolean(errors?.org)}
        >
          <InputLabel htmlFor="org">Org</InputLabel>
          <OutlinedInput
            id="org"
            type="text"
            {...register("org", {
              required: "입력이 필요합니다",
              maxLength: {
                value: 20,
                message: "20자리 이하로 설정해 주세요.",
              },
            })}
            label="org"
          />
          <FormHelperText>{errors?.org?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Button
          type="submit"
          variant="outlined"
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
