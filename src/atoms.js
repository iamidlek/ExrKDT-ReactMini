import { atom } from "recoil";

export const userAuth = atom({
  key: "userAuth",
  default: {
    user_email: "sample가입절차를건너뛴email",
    user_name: "없음",
    user_confirm: "Y", // ?
    user_password: "", // 암호화된 정보
    cart_id: "",
  },
});
