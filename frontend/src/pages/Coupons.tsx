import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import { getCoupons } from "../api/api";

interface Coupon {
  code: string;
  used: boolean;
}

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    getCoupons().then(setCoupons).catch(console.error);
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: 700, mx: "auto" }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "#222" }}
      >
        Your Coupons
      </Typography>

      {coupons.length === 0 ? (
        <Typography sx={{ color: "#555" }}>
          No coupons yet. Place an order to earn one! 🎁
        </Typography>
      ) : (
        coupons.map((c, i) => (
          <Card
            key={i}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: c.used ? "#fff1f2" : "#ecfdf5",
              border: "1px solid",
              borderColor: c.used ? "#fecaca" : "#bbf7d0",
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#111827" }}
              >
                {c.code}
              </Typography>

              <Chip
                label={c.used ? "Used" : "Active"}
                color={c.used ? "error" : "success"}
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
