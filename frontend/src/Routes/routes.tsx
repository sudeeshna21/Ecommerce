import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Coupons from "../pages/Coupons";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/coupons" element={<Coupons />} />
    </Routes>
  );
}

