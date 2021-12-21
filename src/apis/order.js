import axios from "axios";

// 주문 총 건수
export const orderAllCount = async (user_id) => {
  const {
    data: { json },
  } = await axios.post("api/order?type=count", { user_id });
  return json[0].total_count;
};

// 주문내역 페이지 네이션
export const orderPage = async (start = 1, user_id) => {
  const {
    data: { json },
  } = await axios.post("api/order?type=page", {
    user_id,
    param_start: (Number(start) - 1) * 5,
    param_length: 5,
  });
  return json;
};

// 주문 내역 날짜 범위
export const orderDateBy = async (user_id, start_date, end_date) => {
  const {
    data: { json },
  } = await axios.post("api/order?type=list", {
    user_id,
    start_date, // 'YYYYMMDD' 형식(string)
    end_date,
  });
  return json;
};

// 주문 내역 상세 정보
export const orderDetail = async (user_id, order_id) => {
  const {
    data: { json },
  } = await axios.post("/api/order?type=orderDetail", {
    user_id,
    order_id,
  });
  return json;
};
