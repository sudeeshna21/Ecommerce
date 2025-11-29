import axios from "axios";
import type { Product, Cart, Order } from "../types/types";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// PRODUCTS
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products/");
  return Object.entries(res.data.products).map(([id, item]: any) => ({
    id: Number(id),
    name: item.name,
    price: item.price,
  }));
};

// CART
export const fetchCart = async (userId: number): Promise<Cart> => {
  const res = await API.get(`/cart/?user_id=${userId}`);
  return res.data.cart;
};

export const addToCart = async (userId: number, itemId: number) => {
  const res = await API.post("/cart/add/", {
    user_id: userId,
    item_id: itemId,
    quantity: 1,
  });
  return res.data;
};

// CHECKOUT / ORDER
export const checkout = async (
  userId: number,
  discountCode?: string
): Promise<Order> => {
  const res = await API.post("/checkout/", {
    user_id: userId,
    discount_code: discountCode,
  });
  return res.data.order;
};

// DISCOUNT
export const generateDiscount = async () => {
  const res = await API.post("/admin/discount/generate/");
  return res.data;
};

