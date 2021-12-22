import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAuth } from "../atoms";

const Routes = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const auth = useRecoilValue(userAuth);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const garud = (path) => {
    if (!auth.user_email && path !== "/") {
      requireLogin();
      setValue(0);
    } else {
      navigate(path);
    }
  };

  const requireLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (pathname === "/" || pathname === "/login") setValue(0);
    if (pathname === "/search") setValue(1);
    if (pathname.includes("/product")) setValue(2);
    if (pathname === "/cart") setValue(3);
    if (pathname.includes("/order")) setValue(4);
    if (pathname.includes("/mypage")) setValue(5);
  }, [pathname]);
  return (
    <Box sx={{ borderBottom: 1, borderColor: "#ccc", marginBottom: "30px" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Board" onClick={() => garud("/")} />
        <Tab label="Search" onClick={() => garud("/search")} />
        <Tab label="Product" onClick={() => garud("/product")} />
        <Tab label="Cart" onClick={() => garud("/cart")} />
        <Tab label="Order" onClick={() => garud("/order")} />
        <Tab label="mypage" onClick={() => garud("/mypage")} />
      </Tabs>
    </Box>
  );
};

export default Routes;
