import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Routes = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "#ccc", marginBottom: "30px" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Board" onClick={() => navigate("/")} />
        <Tab label="Search" onClick={() => navigate("/search")} />
        <Tab label="Product" onClick={() => navigate("/product")} />
        <Tab label="Cart" onClick={() => navigate("/cart")} />
        <Tab label="Order" onClick={() => navigate("/order")} />
      </Tabs>
    </Box>
  );
};

export default Routes;
