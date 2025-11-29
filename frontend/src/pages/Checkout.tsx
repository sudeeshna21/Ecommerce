import { useState } from "react";
import type { Order } from "../types/types";
import { checkout } from "../api/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Checkout() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const USER_ID = 1;

  const handleCheckout = () => {
    checkout(USER_ID, code)
      .then(setOrder)
      .catch(err => alert(err.response?.data?.error));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Checkout</Typography>

      <TextField
        label="Discount Code"
        size="small"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ ml: 2 }}
        onClick={handleCheckout}
      >
        Place Order
      </Button>

      {order && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6">Order Summary</Typography>
          <Typography>Order ID: {order.order_id}</Typography>
          <Typography>Total: ₹{order.total}</Typography>
          <Typography>Discount Applied: ₹{order.discount_applied}</Typography>

          <Typography variant="subtitle1" mt={2}>Items:</Typography>
          {Object.entries(order.items).map(([id, qty]) => (
            <Typography key={id}>Item {id} × {qty}</Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
}
