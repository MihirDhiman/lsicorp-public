import type { Product } from "./Data/ProductsData";
import { categoryData } from "./Data/ProductsData"; // ✅ IMPORT
import ShopProductCard from "./ShopProductCard";

type ShopCategoryProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ShopCategory({
  products,
  onAddToCart,
}: ShopCategoryProps) {

  // ✅ Get max 3 products per category
  const getProductsByCategory = (categoryName: string) =>
    products
      .filter(
        (p) =>
          p.category.toLowerCase() === categoryName.toLowerCase()
      )
      .slice(0, 3);

  return (
    <section className="px-8 py-16 bg-gradient-to-b from-white to-gray-50">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h3 className="text-3xl font-bold">Explore Categories</h3>
        <p className="text-gray-500 mt-2">
          Discover premium products by category
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {categoryData.map((cat) => {
          const categoryProducts = getProductsByCategory(cat.name);

          return (
            <div
              key={cat.name}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-xl">
                  {cat.icon} {/* ✅ Use icon directly */}
                </div>

                <div>
                  <h4 className="text-xl font-semibold">
                    {cat.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {categoryProducts.length} Products
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                  <p className="text-sm text-gray-400 col-span-full">
                    No products available
                  </p>
                )}
              </div>

              {/* View All */}
              <button className="mt-6 text-sm font-medium text-gray-600 hover:text-black transition">
                View all →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}