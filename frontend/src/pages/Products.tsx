import { useEffect, useState } from "react";
import type { Product } from "../types/types";
import { fetchProducts, addToCart } from "../api/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const USER_ID = 1;

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Products</Typography>

      <Stack spacing={2}>
        {products.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography color="text.secondary">₹{item.price}</Typography>

              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => addToCart(USER_ID, item.id)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
