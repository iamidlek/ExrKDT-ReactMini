import { useEffect, useState } from "react";
import { Button, Grid, Pagination } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";
import { orderAllCount, orderDateBy, orderPage } from "../apis/order";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import OrderList from "./Oreder/OrderList";
import DatePicker from "./Oreder/DatePicker";

const Order = () => {
  const [count, setCount] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [datePick, setDatePick] = useState([null, null]);

  const auth = useRecoilValue(userAuth);
  const navigate = useNavigate();

  const pageNation = async (page) => {
    // pagenation 보여지는 조건
    setDatePick([null, null]);
    const data = await orderPage(page, auth.user_email);
    setOrderList(data);
  };
  // 비동기 기다리지 않고 클린업 하는 방법
  const [isClean, setIsClean] = useState(false);
  useEffect(() => {
    (async () => {
      const [counts, data] = await Promise.all([
        orderAllCount(auth.user_email),
        orderPage(1, auth.user_email),
      ]);
      if (isClean) return;
      setCount(counts);
      setOrderList(data);
    })();
    return () => {
      setIsClean(true);
    };
  }, []);
  useEffect(() => {
    if (datePick[1] === null || datePick[0] === null) return;
    const start = format(new Date(datePick[0]), "yyyyMMdd");
    const end = format(new Date(datePick[1]), "yyyyMMdd");
    (async () => {
      const data = await orderDateBy(auth.user_email, start, end);
      setOrderList(data);
    })();
  }, [datePick[1]]);
  return (
    <>
      <Grid container style={{ marginBottom: "32px" }} spacing={2}>
        <Grid item xs={2.5}>
          <Button
            variant="outlined"
            onClick={() => {
              pageNation(1);
            }}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
          >
            전체 보기
          </Button>
        </Grid>
        <Grid item xs={2.4}>
          <Button
            variant="outlined"
            color="success"
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
            onClick={() => navigate("/order/chart")}
          >
            차트 보기
          </Button>
        </Grid>
        <Grid item xs={7.2}></Grid>
        <Grid item xs={5}>
          <DatePicker datePick={datePick} setDatePick={setDatePick} />
        </Grid>
      </Grid>
      <OrderList orderList={orderList} />
      {!datePick[0] && (
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
          count={count ? Math.ceil(count / 10) : 1}
          color="secondary"
          showFirstButton
          showLastButton
          onChange={(event, page) => pageNation(page)}
        />
      )}
    </>
  );
};

export default Order;
