import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "./Data/ProductsData";
import { categoryData } from "./Data/ProductsData";
import ShopProductCard from "./ShopProductCard";

type ShopCategoryProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces → -
    .replace(/[^\w-]+/g, ""); // remove special chars

export default function ShopCategory({
  products,
  onAddToCart,
}: ShopCategoryProps) {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // ✅ Show only 4 or all
  const visibleCategories = showAll
    ? categoryData
    : categoryData.slice(0, 4);

  // ✅ Get max 3 products per category
  const getProductsByCategory = (categoryName: string) =>
    products
      .filter(
        (p) =>
          p.category.toLowerCase() === categoryName.toLowerCase()
      )
      .slice(0, 2);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      
      {/* Header */}
      <div className="mb-8 text-center sm:mb-10 lg:mb-12">
        <h3 className="text-2xl font-bold sm:text-3xl">Explore Categories</h3>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Discover premium products by category
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid gap-5 sm:gap-6 lg:gap-10 md:grid-cols-2">
        {visibleCategories.map((cat) => {
          const categoryProducts = getProductsByCategory(cat.name);

          return (
            <div
              key={cat.name}
              className="rounded-2xl bg-white p-4 shadow-sm transition duration-300 hover:shadow-xl sm:rounded-3xl sm:p-5 lg:p-6"
            >
              {/* Category Header */}
              <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <div className="rounded-xl bg-gray-100 p-2.5 sm:p-3">
                  {cat.icon}
                </div>

                <div>
                  <h4 className="text-lg font-semibold sm:text-xl">
                    {cat.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {categoryProducts.length} Products
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="transform hover:-translate-y-1 transition"
                    >
                      <ShopProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                      />
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-sm text-gray-400">
                    No products available
                  </p>
                )}
              </div>

              {/* 🔥 View All → Redirect */}
              <button
  onClick={() =>
    navigate(`/shop/${toSlug(cat.name)}`)
  }
  className="mt-5 text-sm font-medium text-gray-600 transition hover:text-black sm:mt-6"
>
  View all →
</button>
            </div>
          );
        })}
      </div>

      {/* 🔥 GLOBAL VIEW ALL BUTTON */}
      {categoryData.length > 4 && (
        <div className="mt-10 text-center sm:mt-12">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-8 sm:py-3 sm:text-base"
          >
            {showAll ? "Show Less Categories" : "View All Categories"}
          </button>
        </div>
      )}
    </section>
  );
}