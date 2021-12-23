import { Button, Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { productAllCount, productPage } from "../apis/product";
import { getMyCartId } from "../apis/cart";
import { useRecoilState } from "recoil";
import { userAuth } from "../atoms";
import ProductList from "./Product/ProductList";
import ProductCategory from "./Product/ProductCategory";

const Product = () => {
  const [auth, setAuth] = useRecoilState(userAuth);
  const [cateOne, setCateOne] = useState("");

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const pageNation = async (page) => {
    // pagenation 보여지는 조건
    setCateOne("");
    const data = await productPage(page, auth.user_email);
    setProducts(data);
  };

  // 비동기 기다리지 않고 클린업 하는 방법?
  const [isClean, setIsClean] = useState(false);
  useEffect(() => {
    (async () => {
      const [counts, list, cartId] = await Promise.all([
        productAllCount(auth.user_email),
        productPage(1, auth.user_email),
        getMyCartId(auth.user_email),
      ]);
      if (isClean) return;
      setAuth((info) => ({ ...info, cart_id: cartId }));
      setCount(counts);
      setProducts(list);
    })();
    return () => {
      setIsClean(true);
    };
  }, []);
  return (
    <>
      <Grid container style={{ marginBottom: "16px" }} spacing={2}>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            onClick={() => pageNation(1)}
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
          >
            전체 보기
          </Button>
        </Grid>
      </Grid>
      <ProductCategory
        cateOne={cateOne}
        setCateOne={setCateOne}
        setProducts={setProducts}
      />
      <ProductList products={products} />
      {!cateOne && (
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

export default Product;
