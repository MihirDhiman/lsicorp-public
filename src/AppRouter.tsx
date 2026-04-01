import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import Home from "./pages/public/Home";
import AboutLsi from "./pages/public/AboutLsi";
import ServicesProducts from "./pages/public/ServicesProducts";
import VerticalMarkets from "./pages/public/VerticalMarkets";
import Shop from "./pages/shop/ShopLanding";
import Brands from "./pages/public/Brands";
import Careers from "./pages/public/Careers";
import Login from "./pages/shop/Login";
import RegisterPage from "./pages/shop/ShopRegister";
import ShopUserProfile from "./pages/shop/Home/ShopUserProfile"
import ShopOrders from "./pages/shop/Home/ShopOrders";

import { useState, useEffect } from "react";
import type { Product } from "./pages/shop/Home/Data/ProductsData";
import ResetPassword from "./pages/shop/Home/ResetPassword";
import ForgotPassword from "./pages/shop/Home/ForgotPassword";

type CartItem = Product & { qty: number };

export default function AppRouter() {
  // 🛒 GLOBAL CART
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 💾 Load
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // 💾 Save
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Add
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setIsCartOpen(true);
  };

  // ➕➖
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
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

          <Route
            path="/shop"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/shop/:category"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/shop/:category/:subCategory"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route path="/brands" element={<Brands />} />
          <Route path="/careers" element={<Careers />} />

          <Route
            path="/shop"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />

          <Route
            path="/shop/:category"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/shop/:category/:subCategory"
            element={
              <Shop
                cart={cart}
                addToCart={addToCart}
                totalItems={totalItems}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
                  

        </Route>

        {/* Auth Routes (without PublicLayout) */}
        <Route path="/orders" element={<ShopOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ShopUserProfile/>} />
        \<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />


        <Route
          path="/shop"
          element={
            <Shop
              cart={cart}
              addToCart={addToCart}
              totalItems={totalItems}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
