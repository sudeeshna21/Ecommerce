import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabIndex = {
    "/": 0,
    "/cart": 1,
    "/checkout": 2,
  }[location.pathname] ?? 0;

  const handleChange = (e: any, newValue: number) => {
    const paths = ["/", "/cart", "/checkout"];
    navigate(paths[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Products" />
        <Tab label="Cart" />
        <Tab label="Checkout" />
      </Tabs>
    </Box>
  );
}
