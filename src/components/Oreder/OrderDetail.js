import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { orderDetail } from "../../apis/order";
import { userAuth } from "../../atoms";

const OrderDetail = () => {
  const auth = useRecoilValue(userAuth);
  const {
    state: { order_id },
  } = useLocation();
  const navigation = useNavigate();

  const [details, setDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await orderDetail(auth.user_email, order_id);
      setDetails(data);
    })();
  }, []);
  return (
    <>
      <Grid container style={{ marginBottom: "16px" }} spacing={2}>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            onClick={() => navigation("/order")}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
          >
            목록 가기
          </Button>
        </Grid>
      </Grid>
      <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
        <Grid item xs={2}>
          <ListItemText primary="Img" />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary="Add Cart" />
        </Grid>
        <Grid item xs={2.5}>
          <ListItemText primary="Category" />
        </Grid>
        <Grid item xs={2.5}>
          <ListItemText primary="Price" />
        </Grid>
      </Grid>
      <Box>
        <List style={{ borderTop: "1px solid #ccc" }}>
          {details?.map((item) => (
            <ListItem
              disablePadding
              key={item.product_id}
              style={{ borderBottom: "1px solid #ccc" }}
            >
              <Grid
                container
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <Grid item xs={2}>
                  <img
                    src={item.image}
                    alt="thumbnail"
                    style={{ width: "80px" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                </Grid>
                <Grid item xs={2.5}>
                  <ListItemText primary={item.category1} />
                  <ListItemText primary={item.category2} />
                  <ListItemText primary={item.category3} />
                  <ListItemText primary={item.category4} />
                </Grid>
                <Grid item xs={2.5}>
                  <ListItemText
                    primary={Number(item.l_price).toLocaleString() + "원"}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default OrderDetail;
