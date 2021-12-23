import { useState } from "react";
import { Box } from "@mui/material";
import LoginForm from "./Login/LoginForm";
import SignInForm from "./Login/SignInForm";

const Login = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ececec",
        borderRadius: 5,
        marginTop: 80,
      }}
    >
      {toggle ? (
        <LoginForm setToggle={setToggle} />
      ) : (
        <SignInForm setToggle={setToggle} />
      )}
    </Box>
  );
};

export default Login;
