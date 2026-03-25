import React from "react";
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
  return (
    <section className="px-8 py-12 bg-white">
      <h3 className="text-2xl font-semibold mb-8">
        Featured Products
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ShopProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}