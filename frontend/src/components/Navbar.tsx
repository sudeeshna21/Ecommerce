import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function TabNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabIndex =
    {
      "/": 0,
      "/cart": 1,
      "/checkout": 2,
      "/coupons": 3,
    }[location.pathname] ?? 0;

  const handleChange = (_e: any, newValue: number) => {
    const paths = ["/", "/cart", "/checkout", "/coupons"];
    navigate(paths[newValue]);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "#fef6ff", // cupcake-like soft background
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        centered
        sx={{
          "& .MuiTab-root": {
            fontWeight: 600,
            textTransform: "none",
            color: "#7b8194",
          },
          "& .Mui-selected": {
            color: "#f472b6 !important", // pastel pink
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#f472b6",
          },
        }}
      >
        <Tab label="Products" />
        <Tab label="Cart" />
        <Tab label="Checkout" />
        <Tab label="Coupons" />
      </Tabs>
    </Box>
  );
}
