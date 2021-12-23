import { Box, List, ListItem, ListItemText, Grid, Button } from "@mui/material";
import Swal from "sweetalert2";
import { naverToProductDB } from "../../apis/search";

const ResultList = ({ results }) => {
  const addProduct = async (info) => {
    await naverToProductDB(info);
    Swal.fire("상품 등록", "선택한 상품이 등록되었습니다", "success");
  };
  return (
    <>
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

export default ResultList;
