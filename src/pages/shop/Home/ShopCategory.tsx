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

  const hasResults = finalProducts.length > 0;

  const clearFilters = () => {
    setSearch("");
    navigate("/shop");
  };

  // 🧠 GROUP BY CATEGORY
  const groupedProducts = category
    ? [{ name: category, items: finalProducts }]
    : categoryData.map((cat) => ({
        name: cat.name,
        items: finalProducts.filter((p) => p.category === cat.name),
      }));

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* 🔍 SEARCH + TITLE */}
        <div className="mb-8 rounded-3xl border border-gray-100 bg-white/70 p-4 shadow-sm backdrop-blur sm:mb-10 sm:p-6 lg:mb-12">
          <div className="text-center">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Browse Products
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Search, filter, and find what you love.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-2xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200/70 bg-white/90 px-5 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        {/* 🎯 CATEGORY FILTER */}
        <div className="mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-2 sm:mb-10 sm:gap-3">
          <button
            onClick={clearFilters}
            className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-black/10 ${
              !category
                ? "border-black bg-black text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
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
              className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-black/10 ${
                category === cat.name
                  ? "border-black bg-black text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 📦 SUBCATEGORY FILTER */}
        {category && (
          <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3">
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
                  className={`rounded-full border px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-black/10 ${
                    subCategory === sub
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {sub}
                </button>
              ))}
          </div>
        )}

        {/* Empty state */}
        {!hasResults && (
          <div className="mt-6 rounded-3xl border border-gray-100 bg-white/70 p-8 text-center shadow-sm">
            <div className="text-lg font-semibold text-gray-900">
              No products found
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Try a different search or remove some filters.
            </div>
            <button
              onClick={clearFilters}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* 🧱 PRODUCTS GROUPED */}
        {hasResults && (
          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
            {groupedProducts.map((group) =>
              group.items.length > 0 ? (
                <div
                  key={group.name}
                  className="rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 lg:p-8"
                >
                  {/* 🔥 CATEGORY TITLE */}
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                      {group.name}
                    </h3>
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                      {group.items.length} items
                    </span>
                  </div>

                  {/* PRODUCTS */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        )}
      </div>
    </section>
  );
}