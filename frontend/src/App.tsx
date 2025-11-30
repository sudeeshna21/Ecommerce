import { BrowserRouter } from "react-router-dom";
import TabNavigation from "./components/Navbar";
import AppRoutes from "./Routes/routes";

export default function App() {
  return (
    <BrowserRouter>
      <TabNavigation />
      <div className="app-container">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
