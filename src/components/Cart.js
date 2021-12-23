import { Box } from "@mui/material";
import { getMyCartList, getMyCartTotal } from "../apis/cart";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";
import { useEffect, useState } from "react";
import OrederForm from "./Cart/OrederForm";
import CartTable from "./Cart/CartTable";

const Cart = () => {
  const auth = useRecoilValue(userAuth);

  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getMyCartList(auth.user_email);
      const money = await getMyCartTotal({
        cart_id: auth.cart_id,
        user_id: auth.user_email,
      });
      setCartList(data);
      setTotal(money);
    })();
  }, []);
  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#CCC",
          borderRadius: 5,
        }}
      >
        <CartTable cartList={cartList} />
        <Box
          sx={{
            maxWidth: 830,
            width: "100%",
            height: "80px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "180px",
              lineHeight: "60px",
              textAlign: "center",
              backgroundColor: "#fefefe",
              marginTop: "16px",
              borderRadius: 5,
              boxShadow: "1px 1px 1px #000",
              fontSize: "20px",
              position: "absolute",
              right: 0,
            }}
          >
            총 {total?.toLocaleString()} 원
          </div>
        </Box>
      </Box>
      <OrederForm total={total?.toLocaleString()} />
    </>
  );
};

export default Cart;
