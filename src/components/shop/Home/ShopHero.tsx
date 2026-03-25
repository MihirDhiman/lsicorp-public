import React from "react";
import { products } from "./Data/ProductsData";
import type { Product } from "./Data/ProductsData";
import ShopProductCard from "./ShopProductCard";
type ShopHeroProps = {
  title?: string;
  subtitle?: string;
  onShopClick?: () => void;
  onExploreClick?: () => void;
};

export default function ShopHero({
  title = "Elevate Your Everyday with Intelligent Shopping",
  subtitle = "Experience a new era of premium commerce — curated, fast, and beautifully designed.",
  onShopClick,
  onExploreClick,
}: ShopHeroProps) {
    const featured: Product =
  products.find((p) => p.tags?.includes("premium")) || products[0];

const secondary = products.slice(1, 3);
const finalPrice = featured.discountPrice || featured.price;
  return (
  <section className="relative overflow-hidden bg-white py-20">

  {/* 🌈 Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]" />
    <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full blur-3xl opacity-30 bottom-[-100px] right-[-100px]" />
  </div>

  {/* ✅ Container */}
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* 🧾 LEFT CONTENT (UNCHANGED) */}
    <div className="space-y-6">

      <span className="inline-block px-4 py-1 text-xs bg-black text-white rounded-full tracking-wide">
        NEW EXPERIENCE
      </span>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
        {title}
      </h2>

      <p className="text-gray-600 text-lg max-w-lg">
        {subtitle}
      </p>

      <div className="flex gap-4 pt-2">
        <button
          onClick={onShopClick}
          className="bg-black text-white px-7 py-3 rounded-2xl hover:bg-gray-800 transition active:scale-95 shadow-lg"
        >
          Shop Now →
        </button>

        <button
          onClick={onExploreClick}
          className="border px-7 py-3 rounded-2xl hover:bg-gray-100 transition"
        >
          Explore
        </button>
      </div>

      <div className="flex gap-8 pt-6 text-sm text-gray-500">
        <div>
          <p className="text-black font-semibold text-lg">10K+</p>
          Products
        </div>
        <div>
          <p className="text-black font-semibold text-lg">5K+</p>
          Customers
        </div>
        <div>
          <p className="text-black font-semibold text-lg">4.8★</p>
          Rating
        </div>
      </div>
    </div>

    {/* 🎨 RIGHT VISUAL (FIXED) */}
{/* 🎨 RIGHT VISUAL */}
<div className="relative h-[460px] flex items-center justify-center">

  {/* 🧊 Main Product (Hero Card) */}
  <div className="w-[320px] transform rotate-3 hover:rotate-0 transition duration-500 z-10">
    <ShopProductCard
      product={featured}
      onAddToCart={() => console.log("Add to cart", featured)}
    />
  </div>

  {/* 🔥 Floating Cards (Mini) */}
  {secondary.map((p, i) => (
    <div
      key={p.id}
      className={`absolute w-[180px] scale-90 opacity-90 ${
        i === 0
          ? "top-6 left-6 rotate-[-8deg]"
          : "bottom-6 right-6 rotate-[8deg]"
      }`}
    >
      <ShopProductCard
        product={p}
        onAddToCart={() => console.log("Add to cart", p)}
      />
    </div>
  ))}

  {/* 💎 Glow Effect */}
  <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-purple-300 to-blue-300 blur-3xl opacity-30 rounded-full"></div>

</div>

  </div>
</section>
  );
}