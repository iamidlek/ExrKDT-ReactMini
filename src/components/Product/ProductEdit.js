import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyProduct, deleteProduct } from "../../apis/product";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const ProductEdit = () => {
  const {
    state: { item },
  } = useLocation();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category3, setCategory3] = useState("");
  const [category4, setCategory4] = useState("");

  const editBoard = async () => {
    await modifyProduct({
      ...item,
      title,
      l_price: price,
      category3,
      category4,
    });
    nav("/product");
  };

  useEffect(() => {
    setTitle(item.title);
    setPrice(item.l_price);
    setCategory3(item.category3);
    setCategory4(item.category4);
  }, []);

  return (
    <Box sx={style}>
      <Typography variant="h5" component="h2">
        내용 수정
      </Typography>
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <TextField
        id="price"
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <Typography variant="h6" component="h2" style={{ paddingTop: "16px" }}>
        category1: {item.category1} / category2: {item.category2}
      </Typography>
      <TextField
        id="category3"
        label="Category3"
        value={category3}
        onChange={(e) => setCategory3(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <TextField
        id="category4"
        label="Category4"
        value={category4}
        onChange={(e) => setCategory4(e.target.value)}
        sx={{ mt: 2, width: "100%" }}
        autoComplete="off"
      />
      <Box>
        <Button
          variant="outlined"
          color="success"
          onClick={editBoard}
          style={{ marginTop: "36px", marginRight: "24px" }}
        >
          수정
        </Button>
        <Button
          variant="outlined"
          color="error"
          // disabled={cPassword !== wPassword}
          onClick={() => {
            deleteProduct(item.product_id);
            nav("/product");
          }}
          style={{ marginTop: "36px", marginRight: "24px" }}
        >
          삭제
        </Button>
        <Button
          variant="outlined"
          onClick={() => nav("/product")}
          style={{ marginTop: "36px", marginRight: "24px" }}
        >
          닫기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductEdit;
