import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ShopNav from "./Home/ShopNav";
import ShopHero from "./Home/ShopHero";
import ShopCategory from "./Home/ShopCategoriyHome";
import ShopProductSection from "./Home/ShopProductSection";
import ShopCart from "./Home/ShopCart";

import { products, categoryData } from "./Home/Data/ProductsData";
import type { Product } from "./Home/Data/ProductsData";

type CartItem = Product & { qty: number };

// 🔥 Convert slug → normal text
const normalize = (text?: string) =>
  text ? text.replace(/-/g, " ").toLowerCase() : "";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export default function ShopLanding() {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  // 🛒 Cart
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

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // 🔥 FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    return (
      (!category || p.category.toLowerCase() === normalize(category)) &&
      (!subCategory ||
        p.subCategory?.toLowerCase() === normalize(subCategory))
    );
  });

  const isCategoryPage = !!category || !!subCategory;

  const displayProducts =
    isCategoryPage ? filteredProducts : products;

  return (
    <div className="bg-white text-gray-900">

      {/* NAV */}
      <ShopNav
        totalItems={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* 🔥 CATEGORY PAGE */}
      {isCategoryPage ? (
        <div className="px-8 py-10">

          {/* HEADING */}
          <h2 className="text-3xl font-bold mb-6 capitalize">
            {subCategory
              ? normalize(subCategory)
              : normalize(category)}
          </h2>

          {/* SUBCATEGORY FILTER */}
          {category && (
            <div className="flex flex-wrap gap-3 mb-8">
              {categoryData
                .find(
                  (c) =>
                    c.name.toLowerCase() === normalize(category)
                )
                ?.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() =>
                      navigate(
                        `/shop/${category}/${slugify(sub)}`
                      )
                    }
                    className={`px-4 py-2 rounded-full border ${
                      normalize(subCategory) === sub.toLowerCase()
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
            </div>
          )}

          {/* PRODUCTS */}
          <ShopProductSection
            products={displayProducts}
            onAddToCart={addToCart}
          />
        </div>
      ) : (
        <>
          {/* 🏠 HOME SHOP PAGE */}
          <ShopHero onAddToCart={addToCart} />

          <ShopCategory
            products={products}
            onAddToCart={addToCart}
          />

          <ShopProductSection
            products={products}
            onAddToCart={addToCart}
          />
        </>
      )}

      {/* CART */}
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