import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Product } from "./Data/ProductsData";
import ShopProductCard from "./ShopProductCard";
import { categoryData } from "./Data/ProductsData";

type ShopCategoryProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ShopCategory({
  products,
  onAddToCart,
}: ShopCategoryProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const category = searchParams.get("category");
  const subCategory = searchParams.get("sub");

  // 🔍 SEARCH FILTER
  const searchFiltered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 CATEGORY FILTER
  const finalProducts = searchFiltered.filter((p) => {
    return (
      (!category || p.category === category) &&
      (!subCategory || p.subCategory === subCategory)
    );
  });

  // 🧠 GROUP BY CATEGORY
  const groupedProducts = category
    ? [{ name: category, items: finalProducts }]
    : categoryData.map((cat) => ({
        name: cat.name,
        items: finalProducts.filter((p) => p.category === cat.name),
      }));

  return (
    <section className="px-8 py-16 bg-gradient-to-b from-white to-gray-50">

      {/* 🔍 SEARCH BAR */}
      <div className="mb-10 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* 🎯 CATEGORY FILTER */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <button
          onClick={() => navigate("/shop")}
          className={`px-4 py-2 rounded-full border ${
            !category ? "bg-black text-white" : ""
          }`}
        >
          All
        </button>

        {categoryData.map((cat) => (
          <button
            key={cat.name}
            onClick={() =>
              navigate(`/shop?category=${encodeURIComponent(cat.name)}`)
            }
            className={`px-4 py-2 rounded-full border ${
              category === cat.name ? "bg-black text-white" : ""
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 📦 SUBCATEGORY FILTER */}
      {category && (
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categoryData
            .find((c) => c.name === category)
            ?.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  navigate(
                    `/shop?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sub)}`
                  )
                }
                className={`px-3 py-1 text-sm rounded-full border ${
                  subCategory === sub
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {sub}
              </button>
            ))}
        </div>
      )}

      {/* 🧱 PRODUCTS GROUPED */}
      <div className="space-y-16">
        {groupedProducts.map((group) =>
          group.items.length > 0 ? (
            <div key={group.name}>
              
              {/* 🔥 CATEGORY TITLE */}
              <h3 className="text-2xl font-bold mb-6">
                {group.name}
              </h3>

              {/* PRODUCTS */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {group.items.map((product) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}