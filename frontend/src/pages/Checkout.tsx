import { useState } from "react";
import { Button, Box, Typography, TextField, Card, CardContent } from "@mui/material";
import { useCart } from "../context/CartContext";
import { checkoutOrder } from "../api/api";
import type { CartItem } from "../types/types";

export default function CheckoutPage() {
  const { cart, refreshCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");

  const subtotal = cart.reduce((sum:any, item:any) => sum + item.price * item.qty, 0);
  const discount = discountCode ? (subtotal * 0.1).toFixed(2) : "0.00";
  const total = (subtotal - Number(discount)).toFixed(2);

  const handleCheckout = async () => {
    try {
      const res = await checkoutOrder(discountCode);
      alert(res.message + (res.reward_coupon ? "\nYou earned coupon: " + res.reward_coupon : ""));
      refreshCart();
      setDiscountCode("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid discount code");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>

      {cart.length === 0 ? (
        <Typography sx={{ color: "#444" }}>Your cart is empty!</Typography>
      ) : (
        <>
          <Card sx={{ p: 2, mb: 2 }}>
            <CardContent>
              {cart.map((item:CartItem) => (
                <Typography key={item.id}>
                  {item.name} x {item.qty} — ${(item.qty * item.price).toFixed(2)}
                </Typography>
              ))}
              <Typography sx={{ mt: 2 }}>Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography>Discount: -${discount}</Typography>
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                Total: ${total}
              </Typography>
            </CardContent>
          </Card>

          <TextField
            label="Discount Code"
            fullWidth
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            sx={{ mb: 2 }}
            error={!!error}
            helperText={error}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckout}
            sx={{ py: 1 }}
          >
            Place Order
          </Button>
        </>
      )}
    </Box>
  );
}
