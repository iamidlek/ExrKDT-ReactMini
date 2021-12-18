import axios from "axios";

// 총 상품 개수
export const productAllCount = async (user_id = "test@test.com") => {
  const {
    data: { json },
  } = await axios.post("api/product?type=count", { user_id });
  return json[0].total_count;
};

// 등록된 상품 페이지 네이션
export const productPage = async (start = 1) => {
  const {
    data: { json },
  } = await axios.post("api/product?type=page", {
    user_id: "", // 필수
    start: (Number(start) - 1) * 10,
    length: 10,
  });
  return json;
};

// 카테고리 정보 취득
export const getCategory = async ({ num, category1, category2, category3 }) => {
  const {
    data: { json },
  } = await axios.post("api/product?type=category", {
    num,
    category1,
    category2,
    category3,
  });
  return json;
};

// 선택된 조건에 따른 목록 (카테고리 or 제목)
export const selectedList = async ({
  user_id = "", // 필수
  title,
  category1,
  category2,
  category3,
  category4,
}) => {
  const {
    data: { json },
  } = await axios.post("api/product?type=list", {
    user_id,
    title,
    category1,
    category2,
    category3,
    category4,
  });
  return json;
};

// 상품 수정
export const modifyProduct = async (info) => {
  //  api 앞에 / 를 안 붙이면 product/:id 의 product가 붙는 문제가 생김
  const { data } = await axios.post("/api/product?type=modify", info);
  return data;
};

// 상품 삭제
export const deleteProduct = async (product_id) => {
  const { data } = await axios.post("/api/product?type=delete", { product_id });
  return data;
};
