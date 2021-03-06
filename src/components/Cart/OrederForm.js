import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { orderCart, getMyCartId } from "../../apis/cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAuth } from "../../atoms";

const OrederForm = ({ total }) => {
  const nav = useNavigate();
  const { user_email, cart_id } = useRecoilValue(userAuth);
  const setAuth = useSetRecoilState(userAuth);
  const [tel1, setTel1] = useState("010");
  const [tel2, setTel2] = useState("");
  const [tel3, setTel3] = useState("");
  const [post, setPost] = useState("");

  const [card1, setCard1] = useState("");
  const [card2, setCard2] = useState("");
  const [card3, setCard3] = useState("");
  const [card4, setCard4] = useState("");

  const [expiry, setExpiry] = useState("");

  const onlyNums = (e, setter, num) => {
    if (e.target.value.length > num) {
      return;
    }
    setter(e.target.value.replace(/[^0-9]/g, ""));
  };
  const expiryDate = (e) => {
    if (e.target.value.length > 5) {
      return;
    }
    if (e.target.value.length === 2 && e.target.value.length > expiry.length) {
      setExpiry(e.target.value + "/");
    } else {
      setExpiry(e.target.value.replace(/[^0-9/]/g, ""));
    }
  };
  const order = async (e) => {
    e.preventDefault();
    const { target } = e;
    const res = await orderCart({
      receive_user: target.reciver.value,
      receive_user_tel1: tel1,
      receive_user_tel2: tel2,
      receive_user_tel3: tel3,
      receive_address3: post,
      receive_address1: target.location1.value,
      receive_address2: target.location2.value,
      card_user: target.cardOwner.value,
      cart_dv: target.cardBrand.value,
      card_number1: card1,
      card_number2: card2,
      card_number3: card3,
      card_number4: card4,
      card_month: expiry.slice(0, 2),
      card_year: expiry.slice(3),
      total_price: total.replace(/,/g, ""),
      cart_id,
      user_id: user_email,
      complete_yn: "Y", // order table??? ??????????????? ??????????????? ????????? Y ??? ?????????
    });
    if (res === "success") {
      Swal.fire("?????? ??????", "????????? ????????? ?????????????????????", "success");
      nav("/order");
      // ?????? ??? ??????
      const cartId = await getMyCartId(user_email);
      setAuth((info) => ({ ...info, cart_id: cartId }));
    } else {
      Swal.fire({
        icon: "error",
        title: "?????? ??????",
        text: "????????? ??????????????? ???????????? ???????????????",
      });
    }
  };
  return (
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#ececec",
        borderRadius: 5,
        marginTop: 16,
      }}
      onSubmit={order}
    >
      <Grid container style={{ textAlign: "left", maxWidth: 830 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          ????????? ??????
        </Typography>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <TextField
            id="reciver"
            sx={{ backgroundColor: "white" }}
            label="?????????"
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ textAlign: "left", marginBottom: "16px", maxWidth: 830 }}
      >
        <Grid item xs={12}>
          <Typography
            variant="p"
            component="p"
            sx={{ textAlign: "left", color: "#a3a3a3", marginBottom: "4px" }}
          >
            ?????? ??????
          </Typography>
        </Grid>
        <Grid item sx={{ width: "60px" }}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={tel1}
            onChange={(e) => onlyNums(e, setTel1, 3)}
          />
        </Grid>
        <Grid item sx={{ width: "20px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item sx={{ width: "70px" }}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={tel2}
            onChange={(e) => onlyNums(e, setTel2, 4)}
          />
        </Grid>
        <Grid item sx={{ width: "20px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item sx={{ width: "70px" }}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={tel3}
            onChange={(e) => onlyNums(e, setTel3, 4)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ textAlign: "left", marginBottom: "14px", maxWidth: 830 }}
      >
        <Grid item xs={12}>
          <TextField
            sx={{ backgroundColor: "white", marginBottom: "14px" }}
            value={post}
            onChange={(e) => onlyNums(e, setPost, 5)}
            label="????????????"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="location1"
            sx={{ backgroundColor: "white", width: "96%" }}
            label="?????????"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="location2"
            sx={{ backgroundColor: "white", width: "96%" }}
            label="????????? ??????"
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ textAlign: "left", marginBottom: "8px", maxWidth: 830 }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          ?????? ??????
        </Typography>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <TextField
            id="cardOwner"
            sx={{ backgroundColor: "white" }}
            label="?????? ?????????"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="cardBrand"
            sx={{ backgroundColor: "white" }}
            label="?????????"
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ textAlign: "left", marginBottom: "16px", maxWidth: 830 }}
      >
        <Grid item xs={12}>
          <Typography
            variant="p"
            component="p"
            sx={{ textAlign: "left", color: "#a3a3a3", marginBottom: "4px" }}
          >
            ?????? ??????
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={card1}
            onChange={(e) => onlyNums(e, setCard1, 4)}
          />
        </Grid>
        <Grid item sx={{ width: "20px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={card2}
            onChange={(e) => onlyNums(e, setCard2, 4)}
          />
        </Grid>
        <Grid item sx={{ width: "20px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={card3}
            onChange={(e) => onlyNums(e, setCard3, 4)}
          />
        </Grid>
        <Grid item sx={{ width: "20px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item xs={2.4}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={card4}
            onChange={(e) => onlyNums(e, setCard4, 4)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ textAlign: "left", marginBottom: "16px", maxWidth: 830 }}
      >
        <Grid item xs={2.4}>
          <TextField
            sx={{ backgroundColor: "white" }}
            value={expiry}
            onChange={expiryDate}
            label="??? / ???"
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          paddingTop: "36px",
          marginBottom: "36px",
          maxWidth: 830,
          borderTop: "1px solid black",
        }}
      >
        <Grid item xs={5}></Grid>
        <Grid item xs={5}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", lineHeight: "52px" }}
          >
            ?????? ?????? : {total} ???
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            type="submit"
            variant="outlined"
            sx={{ width: "100%", height: "100%", backgroundColor: "white" }}
          >
            ??????
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrederForm;
