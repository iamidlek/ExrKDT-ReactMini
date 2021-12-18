import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategory,
  selectedList,
  productAllCount,
  productPage,
} from "../apis/product";

const Product = () => {
  const [cateOne, setCateOne] = useState("");
  const [cateTwo, setCateTwo] = useState("");
  const [cateThr, setCateThr] = useState("");
  const [cateFour, setCateFour] = useState("");

  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const Category1Change = async (event) => {
    const {
      target: { value },
    } = event;
    setCateOne(value);
    // 카테고리2 가져오기
    const data = await getCategory({ num: 2, category1: value });
    const list = await selectedList({ category1: value });
    setProducts(list);
    setCategory2(data);
  };

  const Category2Change = async (event) => {
    const {
      target: { value },
    } = event;
    setCateTwo(value);
    // 카테고리3 가져오기
    const data = await getCategory({
      num: 3,
      category1: cateOne,
      category2: value,
    });
    const list = await selectedList({ category1: cateOne, category2: value });
    setProducts(list);
    setCategory3(data);
  };

  const Category3Change = async (event) => {
    const {
      target: { value },
    } = event;
    setCateThr(value);
    // 카테고리4 가져오기
    const data = await getCategory({
      num: 4,
      category1: cateOne,
      category2: cateTwo,
      category3: value,
    });
    const list = await selectedList({
      category1: cateOne,
      category2: cateTwo,
      category3: value,
    });
    setProducts(list);
    setCategory4(data);
  };

  const Category4Change = async (event) => {
    const {
      target: { value },
    } = event;
    setCateFour(value);
    // 해당 정보 가져오기
    const list = await selectedList({
      category1: cateOne,
      category2: cateTwo,
      category3: cateThr,
      category4: value,
    });
    setProducts(list);
  };

  const pageNation = async (page) => {
    // pagenation 보여지는 조건
    setCateOne("");
    const data = await productPage(page);
    setProducts(data);
  };

  useEffect(() => {
    (async () => {
      const [counts, data, list] = await Promise.all([
        productAllCount(),
        getCategory({ num: 1 }),
        productPage(1),
      ]);
      setCount(counts);
      setProducts(list);
      setCategory1(data);
    })();
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
      <Grid
        container
        spacing={2}
        style={{ textAlign: "left", marginBottom: "16px" }}
      >
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category1</InputLabel>
            <Select
              value={cateOne}
              label="Category1"
              onChange={Category1Change}
            >
              {category1?.map((obj, index) => (
                <MenuItem key={index} value={obj.category1}>
                  {obj.category1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category2</InputLabel>
            <Select
              disabled={!cateOne}
              value={cateTwo}
              label="Category2"
              onChange={Category2Change}
            >
              {category2?.map((obj) => (
                <MenuItem value={obj.category2}>{obj.category2}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category3</InputLabel>
            <Select
              disabled={!cateTwo}
              value={cateThr}
              label="Category3"
              onChange={Category3Change}
            >
              {category3?.map((obj) => (
                <MenuItem value={obj.category3}>{obj.category3}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category4</InputLabel>
            <Select
              disabled={!cateThr}
              value={cateFour}
              label="Category4"
              onChange={Category4Change}
            >
              {category4?.map((obj) => (
                <MenuItem value={obj.category4}>{obj.category4}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container style={{ textAlign: "center", marginBottom: "16px" }}>
        <Grid item xs={2}>
          <ListItemText primary="Img" />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary="Title" />
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
                  <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
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
