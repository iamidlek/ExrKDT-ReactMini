import {
  Box,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { naverKeyword, naverResult, naverToProductDB } from "../apis/search";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [relative, setRelative] = useState([]);
  const [results, setResults] = useState([]);

  const getResult = async (value = "") => {
    if (value) {
      const data = await naverResult(value);
      setResults(data);
    } else {
      const data = await naverResult(keyword);
      setResults(data);
    }
  };

  const addProduct = async (info) => {
    await naverToProductDB(info);
    Swal.fire("상품 등록", "선택한 상품이 등록되었습니다", "success");
  };

  useEffect(() => {
    (async () => {
      const data = await naverKeyword(keyword);
      setRelative(data);
    })();
  }, [keyword]);
  return (
    <>
      <Grid container style={{ textAlign: "right", marginBottom: "16px" }}>
        <Grid item xs={10}>
          <Autocomplete
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getResult();
              }
            }}
            onChange={(event, value) => getResult(value)}
            options={relative}
            renderInput={(params) => (
              <TextField
                {...params}
                label="네이버 상품 검색"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                variant="outlined"
                style={{ width: "100%" }}
                autoComplete="off"
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            onClick={() => getResult()}
            style={{ marginRight: "36px", height: "100%" }}
          >
            검색
          </Button>
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
          <ListItemText primary="Category1" />
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
          {results?.map((item) => (
            <ListItem
              disablePadding
              key={item.productId}
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
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    primary={Number(item.lprice).toLocaleString() + "원"}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="outlined" onClick={() => addProduct(item)}>
                    추가
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

export default Search;
