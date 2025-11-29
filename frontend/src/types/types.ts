export interface Cart {
  [itemId: number]: number;
}

export interface Order {
  order_id: number;
  user_id: number;
  items: Cart;
  total: number;
  discount_applied: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
