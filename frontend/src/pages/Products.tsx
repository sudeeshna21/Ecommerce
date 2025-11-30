import { useEffect, useState } from "react";
import { addToCart, getProducts } from "../api/api";
import type { Product } from "../types/types";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { refreshCart } = useCart();

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product.id);
    refreshCart();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Products
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        }}
      >
        {products.map((p) => (
          <Card key={p.id}>
            <CardMedia
              component="img"
              height="200"
              image={p.image}
              alt={p.name}
              sx={{ objectFit: "contain", p: 1 }}
            />
            <CardContent>
              <Typography variant="subtitle1">{p.name}</Typography>
              <Typography variant="h6">${p.price}</Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
