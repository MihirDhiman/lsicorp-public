import { useState, useEffect } from "react";

import ShopNav from "./Home/ShopNav";
import ShopHero from "./Home/ShopHero";
import ShopCategory from "./Home/ShopCategory";
import ShopProductSection from "./Home/ShopProductSection";
import ShopCart from "./Home/ShopCart";

import { products } from "./Home/Data/ProductsData";
import type { Product } from "./Home/Data/ProductsData";

type CartItem = Product & { qty: number };

export default function ShopLanding() {
  // 📊 Categories
  const categories = [
    { name: "Electronics", items: "128 Items", icon: "📱" },
    { name: "Fashion", items: "86 Items", icon: "👕" },
    { name: "Home Decor", items: "64 Items", icon: "🏠" },
    { name: "Beauty", items: "42 Items", icon: "💄" },
  ];

  // 🛒 Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 💾 Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // 💾 Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Add to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setIsCartOpen(true);
  };

  // ➕➖ Qty
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 Totals
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="bg-white text-gray-900">

      {/* ✅ NAV */}
      <ShopNav
        totalItems={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* ✅ HERO */}
      <ShopHero
        onShopClick={() => console.log("Go to shop")}
        onExploreClick={() => console.log("Explore")}
      />

      {/* ✅ CATEGORY */}
     <ShopCategory
  categories={categories}
  products={products}
  onAddToCart={addToCart}
/>

      {/* ✅ PRODUCTS */}
      <ShopProductSection
        products={products}
        onAddToCart={addToCart}
      />

      {/* ✅ CART */}
      <ShopCart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />

    </div>
  );
}