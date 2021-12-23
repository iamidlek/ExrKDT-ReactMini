import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getCategory, selectedList } from "../../apis/product";
import { userAuth } from "../../atoms";

const ProductCategory = ({ cateOne, setCateOne, setProducts }) => {
  const auth = useRecoilValue(userAuth);

  const [cateTwo, setCateTwo] = useState("");
  const [cateThr, setCateThr] = useState("");
  const [cateFour, setCateFour] = useState("");

  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [category4, setCategory4] = useState([]);

  const CategoryChange = async (event, num) => {
    const {
      target: { value },
    } = event;
    switch (num) {
      case 2:
        setCateOne(value);
        setProducts(
          await selectedList({
            user_id: auth.user_email,
            category1: value,
          })
        );
        setCategory2(await getCategory({ num, category1: value }));
        break;
      case 3:
        setCateTwo(value);
        setProducts(
          await selectedList({
            user_id: auth.user_email,
            category1: cateOne,
            category2: value,
          })
        );
        setCategory3(
          await getCategory({
            num,
            category1: cateOne,
            category2: value,
          })
        );
        break;
      case 4:
        setCateThr(value);
        setProducts(
          await selectedList({
            user_id: auth.user_email,
            category1: cateOne,
            category2: cateTwo,
            category3: value,
          })
        );
        setCategory4(
          await getCategory({
            num,
            category1: cateOne,
            category2: cateTwo,
            category3: value,
          })
        );
        break;
      default:
        setCateFour(value);
        setProducts(
          await selectedList({
            user_id: auth.user_email,
            category1: cateOne,
            category2: cateTwo,
            category3: cateThr,
            category4: value,
          })
        );
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getCategory({ num: 1 });
      setCategory1(data);
    })();
  }, []);
  return (
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
            onChange={(e) => CategoryChange(e, 2)}
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
            onChange={(e) => CategoryChange(e, 3)}
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
            onChange={(e) => CategoryChange(e, 4)}
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
            onChange={(e) => CategoryChange(e, 5)}
          >
            {category4?.map((obj) => (
              <MenuItem value={obj.category4}>{obj.category4}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ProductCategory;
