import { useEffect, useState } from "react";
import { fetchCart } from "../api/api";
import type { Cart } from "../types/types";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({});
  const USER_ID = 1;

  useEffect(() => {
    fetchCart(USER_ID).then(setCart);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Your Cart</Typography>

      {Object.keys(cart).length === 0 && <p>No items in cart</p>}

      <List>
        {Object.entries(cart).map(([id, qty]) => (
          <ListItem key={id}>
            Item {id} × {qty}
          </ListItem>
        ))}
      </List>

      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          disabled={!Object.keys(cart).length}
        >
          Proceed to Checkout
        </Button>
      </Link>
    </Box>
  );
}
