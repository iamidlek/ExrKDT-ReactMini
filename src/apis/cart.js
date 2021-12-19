import axios from "axios";

// 카트 아이디 가져오기 혹은 atom에 바로 적용?
//! 로그인 시 가져올것 로그인 기능 404 나머지 3개는 잘됨
//! 추가 장바구니 결제시에도 새로운 cartid를 부여받아야함
export const getMyCartId = async (user_id) => {
  const {
    data: { json },
  } = await axios.post("api/cart?type=cart_id", { user_id });
  return json[0].cart_id;
};

// 장바구니에 담기
export const putInCart = async (info) => {
  const { data } = await axios.post("api/cart?type=save", info);
  return data;
};

// 장바구니 리스트
export const getMyCartList = async (user_id) => {
  const {
    data: { json },
  } = await axios.post("api/cart?type=list", { user_id });
  return json;
};

// 총액 (리스트에서 계산도 가능하나 모든 api 사용하는 것이 요구사항)
export const getMyCartTotal = async (info) => {
  const {
    data: { json },
  } = await axios.post("api/cart?type=totalPrice", info);
  return json[0].total_price;
};

// 장바구니 결제
export const orderCart = async (info) => {
  const { data: payment } = await axios.post("/api/cart?type=order", info);
  if (payment === "success") {
    // 결제 성공 으로 변환 (결제와 동시에 이루어져야 새로운 카트id 발급이 가능)
    const { data } = await axios.post("/api/cart?type=modify", {
      cart_id: info.cart_id,
      user_id: info.user_id,
      complete_yn: "Y",
      product_id: "",
    });
    return data;
  }
  return false;
};
