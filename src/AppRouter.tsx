import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import Home from "./pages/public/Home";
import AboutLsi from "./pages/public/AboutLsi";
import ServicesProducts from "./pages/public/ServicesProducts";
import VerticalMarkets from "./pages/public/VerticalMarkets";
import Shop from "./pages/shop/ShopLanding";
import Brands from "./pages/public/Brands";
import Login from "./pages/shop/Login";
import Shop from "./pages/shop/ShopLanding";

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

          <Route path="/shop" element={<Shop />} />
          
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/shop/:category/:subCategory" element={<Shop />} />
          <Route path="/brands" element={<Brands />} />
        </Route>

        {/* Auth Routes (without PublicLayout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />

      </Routes>
    </BrowserRouter>
  );
}
