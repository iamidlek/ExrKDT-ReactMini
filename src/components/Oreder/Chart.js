import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getChartdetail, getChartInfo } from "../../apis/order";
import { userAuth } from "../../atoms";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const color = [
  "#FCB36C",
  "#6C70FC",
  "#60C9E0",
  "#FCD06C",
  "#6085E0",
  "#6FE060",
  "#6CFCF0",
  "#7814FA",
  "#77BDF7",
  "#07FA52",
  "#FA2F2D",
  "#2D3BFA",
];

const Chart = () => {
  const [chartInfo, setChartInfo] = useState([]);
  const [selected, setSelected] = useState([]);

  const navigate = useNavigate();
  const auth = useRecoilValue(userAuth);

  const categorybetsu = async (category) => {
    const list = await getChartdetail(auth.user_email, category);
    setSelected(list);
  };

  useEffect(() => {
    (async () => {
      const info = await getChartInfo(auth.user_email);
      const objs = info.reduce((acc, cur) => {
        if (cur["amount"] === null) {
          return acc;
        }
        if (!acc[cur["category1"]]) {
          acc[cur["category1"]] = cur["amount"];
          return acc;
        }
        acc[cur["category1"]] += cur["amount"];
        return acc;
      }, {});
      const infos = [];
      for (const [key, value] of Object.entries(objs)) {
        infos.push({ category1: key, sum: value });
      }
      setChartInfo(infos);
    })();
  }, []);
  return (
    <>
      <Grid container style={{ marginBottom: "32px" }} spacing={2}>
        <Grid item xs={2.5}>
          <Button
            variant="outlined"
            color="success"
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
            }}
            onClick={() => navigate("/order")}
          >
            돌아 가기
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} height="300px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartInfo} style={{ margin: "20px 0px" }}>
            <XAxis dataKey="category1" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" onClick={(e) => categorybetsu(e.category1)}>
              {chartInfo.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
      <Grid
        container
        style={{ textAlign: "center", marginBottom: "16px", marginTop: "16px" }}
      >
        <Grid item xs={5}>
          <ListItemText primary="Title" />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary="Price " />
        </Grid>
        <Grid item xs={1}>
          <ListItemText primary="Count" />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary="Category" />
        </Grid>
      </Grid>
      <List style={{ borderTop: "1px solid #ccc" }}>
        {selected?.map((item, idx) => (
          <ListItem
            disablePadding
            key={item.product_id + idx}
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <Grid
              container
              style={{ textAlign: "center", alignItems: "center" }}
            >
              <Grid item xs={5}>
                <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={Number(item.l_price).toLocaleString() + "원"}
                />
              </Grid>
              <Grid item xs={1}>
                <ListItemText primary={item.product_count} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary={item.category1} />
                <ListItemText primary={item.category2} />
                <ListItemText primary={item.category3} />
                <ListItemText primary={item.category4} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default Chart;
