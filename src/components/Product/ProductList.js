import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { userAuth } from "../../atoms";
import { putInCart } from "../../apis/cart";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const auth = useRecoilValue(userAuth);
  const wantToBuy = async (product_id) => {
    await putInCart({
      cart_id: auth.cart_id,
      user_id: auth.user_email,
      product_id,
    });
    Swal.fire("카트 추가", "선택한 상품이 카트에 추가되었습니다", "success");
  };

  return (
    <>
      <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
        <Grid item xs={2}>
          <ListItemText primary="Img" />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary="Add Cart" />
        </Grid>
        <Grid item xs={2}>
          <ListItemText primary="Category" />
        </Grid>
        <Grid item xs={2}>
          <ListItemText primary="Price" />
        </Grid>
        <Grid item xs={1}>
          <ListItemText primary="Enroll" />
        </Grid>
      </Grid>
      <Box>
        <List style={{ borderTop: "1px solid #ccc" }}>
          {products?.map((item) => (
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
                  <ListItemButton
                    onClick={() => wantToBuy(item.product_id)}
                    style={{ textAlign: "center" }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                  </ListItemButton>
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={item.category1} />
                  <ListItemText primary={item.category2} />
                  <ListItemText primary={item.category3} />
                  <ListItemText primary={item.category4} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={Number(item.l_price).toLocaleString() + "원"}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/product/${item.product_id}`, {
                        state: { item },
                      })
                    }
                  >
                    변경
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

export default ProductList;
