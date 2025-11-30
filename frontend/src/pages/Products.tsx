import { useEffect, useState } from "react";
import { addToCart, getProducts, updateCartQty } from "../api/api";
import type { CartItem, Product } from "../types/types";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, refreshCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product.id);
    refreshCart();
  };

  const handleIncrease = async (product: Product) => {
    await updateCartQty(product.id, 1);
    refreshCart();
  };

  const handleDecrease = async (product: Product) => {
    await updateCartQty(product.id, -1);
    refreshCart();
  };

  const getCartQty = (productId: number) => {
    const item = cart.find((c: CartItem) => c.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        }}
      >
        {products.map((p) => {
          const qty = getCartQty(p.id);

          return (
            <Card
              key={p.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "360px",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                background:
                  "linear-gradient(135deg, #fdf2ff 0%, #eef2ff 100%)",
                p: 1,
              }}
            >
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  height: 160,
                  objectFit: "contain",
                }}
              />

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 0.5,
                  p: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    height: 40,
                    overflow: "hidden",
                  }}
                >
                  {p.title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ color: "#374151", mb: 1 }}
                >
                  ${p.price}
                </Typography>

                {qty > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      sx={{ minWidth: 32, fontWeight: "bold" }}
                      onClick={() => handleDecrease(p)}
                    >
                      -
                    </Button>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        minWidth: 20,
                        textAlign: "center",
                        color: "#374151",
                      }}
                    >
                      {qty}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        minWidth: 32,
                        fontWeight: "bold",
                        backgroundColor: "#f472b6",
                        "&:hover": { backgroundColor: "#ec4899" },
                      }}
                      onClick={() => handleIncrease(p)}
                    >
                      +
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(p)}
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      backgroundColor: "#f472b6",
                      "&:hover": { backgroundColor: "#ec4899" },
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
