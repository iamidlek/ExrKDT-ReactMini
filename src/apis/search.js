import axios from "axios";

// 연관 검색어
export const naverKeyword = async (query) => {
  const {
    data: { items },
  } = await axios.post("api/naverApi?type=search", { query });
  return items[0].map((item) => item[0]);
};

// 검색 결과
export const naverResult = async (query) => {
  const {
    data: { items },
  } = await axios.post("api/naverApi?type=shopList", { query });
  return items;
};

// 상품 등록 (product id 가 존재하면 count + 1 하는 api)
export const naverToProductDB = async (info) => {
  const { hprice, lprice, mallName, productId, productType } = info;
  const { data } = await axios.post("api/naverApi?type=save", {
    ...info,
    h_price: hprice,
    l_price: lprice,
    mall_name: mallName,
    product_id: productId,
    product_type: productType,
    product_count: 1,
  });
  return data;
};
