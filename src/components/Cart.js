import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { getMyCartList, getMyCartTotal } from "../apis/cart";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";
import { useEffect, useState } from "react";
import OrederForm from "./Oreder/OrederForm";

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
        <TableContainer sx={{ maxWidth: 830 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 60 }} align="center">
                  이미지
                </TableCell>
                <TableCell style={{ width: 380 }} align="center">
                  상품명
                </TableCell>
                <TableCell style={{ width: 130 }} align="center">
                  가격
                </TableCell>
                <TableCell style={{ width: 130 }} align="center">
                  개수
                </TableCell>
                <TableCell style={{ width: 130 }} align="center">
                  금액
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartList.map((item) => (
                <TableRow
                  key={item.product_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <img
                      src={item.image}
                      alt="thumbnail"
                      style={{ width: "80px" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                  </TableCell>
                  <TableCell align="center">
                    {Number(item.l_price).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell align="center">
                    {(item.amount * item.l_price).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            총 {total.toLocaleString()} 원
          </div>
        </Box>
      </Box>
      <OrederForm total={total.toLocaleString()} />
    </>
  );
};

export default Cart;
