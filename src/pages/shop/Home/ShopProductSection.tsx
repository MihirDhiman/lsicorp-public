import React, { useState } from "react";
import ShopProductCard from "./ShopProductCard";

type Product = any;

type Props = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ShopProductSection({
  products,
  onAddToCart,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  // ✅ Limit products (you can change 8 → 12 if needed)
  const visibleProducts = showAll
    ? products
    : products.slice(0, 8);

  return (
    <section className="px-8 py-12 bg-white">
      <h3 className="text-2xl font-semibold mb-8">
        Featured Products
      </h3>

      {/* 🧱 Products Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <ShopProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* 🔥 View All Button */}
      {products.length > 8 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition font-semibold"
          >
            {showAll ? "Show Less" : "View All Products"}
          </button>
        </div>
      )}
    </section>
  );
}