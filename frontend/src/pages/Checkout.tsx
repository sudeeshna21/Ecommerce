import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { checkoutOrder } from "../api/api";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/types";

export default function Checkout() {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(0);

  const subtotal = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.qty,
    0
  );

  const total = subtotal - discountApplied;

  const handleApplyCoupon = async () => {
    try {
      const res = await checkoutOrder(discountCode);
      setDiscountApplied(res.order.discount);
      setError("");
    } catch (err: any) {
      setError("Invalid discount code");
      setDiscountApplied(0);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await checkoutOrder(discountCode);

      setOrderDetails(res);
      setDialogOpen(true);

      if (res.reward_coupon) {
        const coupons = JSON.parse(localStorage.getItem("coupons") || "[]");
        coupons.push(res.reward_coupon);
        localStorage.setItem("coupons", JSON.stringify(coupons));
      }

      refreshCart();
      setDiscountCode("");
      setDiscountApplied(0);
      setError("");

    } catch (err: any) {
      setError("Something went wrong");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography sx={{ color: "#555" }}>
          Your cart is empty. Add items to proceed!
        </Typography>
      ) : (
        <>
          {/* Order Summary */}
          <Card
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #fef3c7 0%, #fee2e2 100%)",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {cart.map((item: CartItem) => (
                <Typography key={item.id} sx={{ mb: 0.5 }}>
                  {item.name} x {item.qty} — $
                  {(item.qty * item.price).toFixed(2)}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontWeight: "bold" }}>
                Subtotal: ${subtotal.toFixed(2)}
              </Typography>

              {discountApplied > 0 && (
                <Typography sx={{ color: "#16a34a" }}>
                  Discount Applied: -${discountApplied.toFixed(2)}
                </Typography>
              )}

              <Typography sx={{ fontWeight: "bold", mt: 1, color: "#000" }}>
                Total: ${total.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>

          {/* Discount Input */}
          <TextField
            label="Discount Code"
            fullWidth
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            sx={{ mb: 1 }}
            error={!!error}
            helperText={error}
          />

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, py: 1.2, borderRadius: 2 }}
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2, borderRadius: 2 }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </>
      )}

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          🎉 Order Placed Successfully!
        </DialogTitle>

        <DialogContent>
          {orderDetails && (
            <>
              <Typography sx={{ mb: 1 }}>
                Order #{orderDetails.order.order_id} confirmed!
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography>
                Subtotal: ${orderDetails.order.subtotal.toFixed(2)}
              </Typography>
              <Typography>
                Discount: -${orderDetails.order.discount.toFixed(2)}
              </Typography>
              <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                Total Paid: ${orderDetails.order.total.toFixed(2)}
              </Typography>

              {orderDetails.reward_coupon && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#E8F5E9",
                    border: "1px solid #4CAF50",
                  }}
                >
                  <Typography fontWeight="bold" sx={{ color: "#2E7D32" }}>
                    🎁 New Coupon Earned:
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {orderDetails.reward_coupon}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setDialogOpen(false);
              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setDialogOpen(false);
              navigate("/coupons");
            }}
          >
            View Coupons
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
