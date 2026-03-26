import { useState } from "react";
import type { Product } from "./Data/ProductsData";
import ShopProductCard from "./ShopProductCard";

type Category = {
  name: string;
  items: string;
  icon: string;
};

type ShopCategoryProps = {
  categories: Category[];
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ShopCategory({
  categories,
  products,
  onAddToCart,
}: ShopCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(
        (p) =>
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <section className="px-8 py-12 bg-white">
      <h3 className="text-2xl font-semibold mb-8">
        Shop by Categories
      </h3>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`p-6 rounded-2xl cursor-pointer transition ${
              selectedCategory === cat.name
                ? "bg-black text-white"
                : "bg-gray-50 hover:shadow-lg"
            }`}
          >
            <div className="text-3xl mb-3">{cat.icon}</div>
            <h4 className="font-semibold text-lg">{cat.name}</h4>
            <p className="text-sm opacity-70">{cat.items}</p>
          </div>
        ))}
      </div>

      {/* Related Products */}
      {selectedCategory && (
        <>
          <h4 className="text-xl font-semibold mb-6">
            {selectedCategory} Products
          </h4>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}