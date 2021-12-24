import axios from "axios";
import cookie from "react-cookies";

// 로그인
export const login = async (user_email, user_password) => {
  try {
    const { data } = await axios.post("/api/user?type=login", {
      user_email,
      user_password,
    });
    if (data) {
      const { data: token } = await axios.post("/api/user?type=webtoken", {
        user_email,
        user_password,
      });

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      cookie.save("token_id", token.token_id, {
        path: "/",
        expires,
      });
      cookie.save("token_name", token.token_name, {
        path: "/",
        expires,
      });
      cookie.save("user_password", data[0].user_password, {
        path: "/",
        expires,
      });

      return data[0];
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// 쿠키 체크 후 atom 업데이트
export const checkCookie = async () => {
  const tid = await cookie.load("token_id");
  const tname = await cookie.load("token_name");
  const tupwd = await cookie.load("user_password");
  if (tid && tname && tupwd) {
    const { data } = await axios.post("/api/user?type=sessionCheck", {
      token_id: tid,
      token_name: tname,
    });

    const {
      data: { json },
    } = await axios.post("/api/user?type=sessionSignin", {
      user_email: data.decrypt_id.user_email,
      user_password: tupwd,
    });
    return json[0];
  }
};

// 세션 체크
export const sessionTest = async () => {
  const tid = await cookie.load("token_id");
  const tname = await cookie.load("token_name");
  const tupwd = await cookie.load("user_password");

  if (tid && tname) {
    const { data } = await axios.post("/api/user?type=sessionCheck", {
      token_id: tid,
      token_name: tname,
    });
    if (tupwd) {
      const { data: check } = await axios.post("/api/user?type=sessionSignin", {
        user_email: data.decrypt_id.user_email,
        user_password: tupwd,
      });
      console.log(check);
      if (!check[0].user_email) {
        fncNotLogin();
      }
    } else {
      fncNotLogin();
    }
  } else {
    fncNotLogin();
  }
};

const fncNotLogin = () => {
  if (window.location.hash !== "nocookie") {
    fncRemoveCookie();
  }
  setTimeout(function () {
    window.location.href = "/login/#nocookie";
  }, 1000);
};

const fncRemoveCookie = () => {
  cookie.remove("token_id", { path: "/" });
  cookie.remove("token_name", { path: "/" });
  cookie.remove("user_password", { path: "/" });
};

// 이메일 가입 여부 확인
export const checkExistEmail = async (email) => {
  const [user_email1, user_email2] = email.split("@");
  const {
    data: { json },
  } = await axios.post("/api/user?type=dplicheck", {
    user_email1,
    user_email2,
  });
  return json[0].dupliEmailCount;
};

// 회원 가입
export const createID = async (info) => {
  const { data } = await axios.post("/api/user?type=signup", info);
  if (data === "success") {
    return true;
  }
  return false;
};

// 정보 불러오기
export const getUserInfo = async (user_email) => {
  const {
    data: { json },
  } = await axios.post("/api/user?type=selectUser", { user_email });
  return json[0];
};

// 회원 정보 수정
export const modyInfo = async (info) => {
  const { data } = await axios.post("/api/user?type=updateUser", info);
  if (data === "success") {
    return true;
  }
  return false;
};

// 기존 비밀 번호 체크
export const checkPassword = async (user_email, user_password) => {
  const {
    data: { value },
  } = await axios.post("/api/user?type=pwdCheck", {
    user_email,
    user_password,
  });
  if (value === "Y") {
    return true;
  }
  return false;
};

// 비밀 번호 변경
export const changePassword = async (user_email, user_password) => {
  const { data } = await axios.post("/api/user?type=pwd", {
    user_email,
    user_password,
  });
  if (data === "success") {
    return true;
  }
  return false;
};
