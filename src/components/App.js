import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Board from "./Board";
import Cart from "./Cart";
import Order from "./Order";
import Product from "./Product";
import Router from "./Router";
import Search from "./Search";
import BoardItem from "./Board/BoardItem";

function App() {
  return (
    <Container>
      <Router />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/:id" element={<BoardItem />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Container>
  );
}

export default App;
