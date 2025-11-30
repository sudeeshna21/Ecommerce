import { BrowserRouter } from "react-router-dom";
import TabNavigation from "./components/Navbar";
import AppRoutes from "./Routes/routes";
import "./App.css";

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
