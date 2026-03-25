import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import Home from "./pages/public/Home";
import AboutLsi from "./pages/public/AboutLsi";
import ServicesProducts from "./pages/public/ServicesProducts";
import VerticalMarkets from "./pages/public/VerticalMarkets";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about-lsi" element={<AboutLsi />} />
          <Route path="/services-products" element={<ServicesProducts />} />
          <Route path="/vertical-markets" element={<VerticalMarkets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
