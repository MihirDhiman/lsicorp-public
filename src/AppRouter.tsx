import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import Home from "./pages/Home";
import AboutLsi from "./pages/AboutLsi";
import Shop from "./components/shop/ShopLanding";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-lsi" element={<AboutLsi />} />
          <Route path="/shop" element={<Shop />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
