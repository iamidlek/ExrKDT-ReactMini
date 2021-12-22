import axios from "axios";

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
