import { useCart } from "../context/CartContext";
import { updateCartQty } from "../api/api";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import type { CartItem } from "../types/types";

export default function CartPage() {
  const { cart, refreshCart } = useCart();

  const handleIncrease = async (item: CartItem) => {
    await updateCartQty(item.id, 1);
    refreshCart();
  };

  const handleDecrease = async (item: CartItem) => {
    await updateCartQty(item.id, -1);
    refreshCart();
  };

  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.qty,
    0
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#222" }}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            mt: 4,
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#555",
          }}
        >
          🛒 Your cart is empty<br /><br />
          Add items from the <strong>Products</strong> tab!
        </Typography>
      ) : (
        <>
          <Box sx={{ display: "grid", gap: 2 }}>
            {cart.map((item: CartItem) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  background: "#f8f8f8",
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: 1,
                    mr: 2,
                  }}
                  image={item.image}
                  alt={item.name}
                />

                <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                  <Typography sx={{ fontWeight: 600, color: "#333" }}>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#666" }}>
                    ${item.price}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      sx={{ minWidth: "32px" }}
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </Button>

                    <Typography
                      sx={{
                        mx: 2,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {item.qty}
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{ minWidth: "32px" }}
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#111",
                    ml: 2,
                  }}
                >
                  ${(item.qty * item.price).toFixed(2)}
                </Typography>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "1.25rem", color: "#111" }}
          >
            Total: ${total.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 3, py: 1.2, fontSize: "1rem" }}
            fullWidth
            onClick={() => alert("Proceeding to checkout")}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            sx={{ mt: 1.5, py: 1.2, fontSize: "1rem" }}
            fullWidth
            onClick={() => alert("Apply Discount Coming Soon!")}
          >
            Apply Discount Code
          </Button>
        </>
      )}
    </Box>
  );
}
