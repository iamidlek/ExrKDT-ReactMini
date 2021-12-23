import { Box, Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderList = ({ orderList }) => {
  const navigate = useNavigate();
  return (
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
    </>
  );
};

export default OrderList;
