import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Board from "./Board";
import Cart from "./Cart";
import Order from "./Order";
import Product from "./Product";
import Router from "./routes/Router";
import Search from "./Search";
import BoardDetail from "./Board/BoardDetail";
import ProductEdit from "./Product/ProductEdit";
import OrderDetail from "./Oreder/OrderDetail";
import Chart from "./Oreder/Chart";
import MyPage from "./MyPage";
import Login from "./Login";

function App() {
  return (
    <Container>
      <Router />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/:id" element={<BoardDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductEdit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/order/chart" element={<Chart />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
