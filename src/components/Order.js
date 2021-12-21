import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";
import { orderAllCount, orderDateBy, orderPage } from "../apis/order";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [count, setCount] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [datePick, setDatePick] = useState([null, null]);

  const [toggle, setToggle] = useState(false);

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
              setToggle(false);
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
            onClick={() => setToggle(true)}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
          >
            차트 보기
          </Button>
        </Grid>
        <Grid item xs={7.2}></Grid>
        {toggle ? (
          <>
            <div>chart</div>
          </>
        ) : (
          <>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DateRangePicker
                  startText="시작일"
                  endText="종료일"
                  calendars={1}
                  value={datePick}
                  onChange={(newValue) => {
                    setDatePick(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField autoComplete="off" {...startProps} />
                      <Box sx={{ mx: 1 }}> - </Box>
                      <TextField autoComplete="off" {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </>
        )}
      </Grid>
      {!toggle && (
        <>
          <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
            <Grid item xs={2}>
              <ListItemText primary="결제일" />
            </Grid>
            <Grid item xs={2}>
              <ListItemText primary="수취인" />
            </Grid>
            <Grid item xs={2}>
              <ListItemText primary="결제주" />
            </Grid>
            <Grid item xs={2}>
              <ListItemText primary="결제액" />
            </Grid>
            <Grid item xs={3}>
              <ListItemText primary="결제정보" />
            </Grid>
            <Grid item xs={1}>
              <ListItemText primary="상세보기" />
            </Grid>
          </Grid>
          <Box>
            <List style={{ borderTop: "1px solid #ccc" }}>
              {orderList?.map((item) => (
                <ListItem
                  disablePadding
                  key={item.order_id}
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <Grid
                    container
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    <Grid item xs={2}>
                      <ListItemText primary={item.insert_date.slice(0, 10)} />
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText primary={item.receive_user} />
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText primary={item.card_user} />
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText
                        primary={item.total_price.toLocaleString() + "원"}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText primary={item.cart_dv} />
                      <ListItemText
                        primary={item.card_number1 + "-xxxx-xxxx-xxxx"}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigate(`/order/${item.order_id}`, {
                            state: { order_id: item.order_id },
                          })
                        }
                      >
                        상세
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Box>
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
      )}
    </>
  );
};

export default Order;
