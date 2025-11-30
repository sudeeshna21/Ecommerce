import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "../api/api";
import type { CartItem } from "../types/types";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = () => {
    getCart().then((data) => setCart(data));
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
