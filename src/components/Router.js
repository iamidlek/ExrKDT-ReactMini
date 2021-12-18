import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Routes = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (pathname === "/") setValue(0);
    if (pathname === "/search") setValue(1);
    if (pathname.includes("/product")) setValue(2);
    if (pathname === "/cart") setValue(3);
    if (pathname === "/order") setValue(4);
  }, [pathname]);
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
