import { atom } from "recoil";

export const userAuth = atom({
  key: "userAuth",
  default: {
    user_email: "",
    user_password: "",
    cart_id: "",
  },
});
