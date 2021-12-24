import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAuth } from "../../atoms";
import { checkCookie, sessionTest } from "../../apis/user";
import { getMyCartId } from "../../apis/cart";

const Routes = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [auth, setAuth] = useRecoilState(userAuth);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const guard = async (path) => {
    if ("/" !== path && !auth.user_email) {
      requireLogin();
      setValue(0);
    } else {
      // 세션 확인이 되면 이동
      sessionTest();
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

  useEffect(() => {
    (async () => {
      const getInfo = await checkCookie();
      const cart_id = await getMyCartId(getInfo.user_email);
      setAuth((info) => ({
        ...info,
        user_email: getInfo.user_email,
        user_password: getInfo.user_password,
        cart_id,
      }));
    })();
  }, []);
  return (
    <Box sx={{ borderBottom: 1, borderColor: "#ccc", marginBottom: "30px" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Board" onClick={() => guard("/")} />
        <Tab label="Search" onClick={() => guard("/search")} />
        <Tab label="Product" onClick={() => guard("/product")} />
        <Tab label="Cart" onClick={() => guard("/cart")} />
        <Tab label="Order" onClick={() => guard("/order")} />
        <Tab label="mypage" onClick={() => guard("/mypage")} />
      </Tabs>
    </Box>
  );
};

export default Routes;
