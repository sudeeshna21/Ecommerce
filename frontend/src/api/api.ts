import axios from "axios";
import type { Product, Cart, Order } from "../types/types";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// PRODUCTS
export async function getProducts(): Promise<Product[]> {
  const res = await API.get("products/");
  return res.data; 
}

// CART
export async function addToCart(product_id: number) {
  const res = await API.post("cart/add/", {
    user_id: 1,
    item_id: product_id,
    quantity: 1,
  });
  return res.data;
}

export async function updateCartQty(product_id: number, change: number) {
  const res = await API.put("cart/update/", {
    user_id: 1,
    item_id: product_id,
    quantity: change, 
  });
  return res.data.cart;
}


export async function getCart() {
  const res = await API.get("cart/");
  return res.data.cart;
}

// CHECKOUT / ORDER
export const checkoutOrder = async (discount_code?: string) => {
  const res = await API.post("checkout/", {
    user_id: 1,
    discount_code: discount_code || ""
  });
  return res.data;
};


export const getCoupons = async () => {
  const res = await API.get("coupons/1/");
  return res.data.coupons;
};

