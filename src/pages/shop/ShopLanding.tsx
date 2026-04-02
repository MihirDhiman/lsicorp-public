import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ShopNav from "./Home/ShopNav";
import ShopHero from "./Home/ShopHero";
import ShopCategory from "./Home/ShopCategoriyHome";
import ShopProductSection from "./Home/ShopProductSection";
import ShopCart from "./Home/ShopCart";

import { products, categoryData } from "./Home/Data/ProductsData";
import type { Product } from "./Home/Data/ProductsData";
import ShopFooter from "./Home/ShopFooter";

type CartItem = Product & { qty: number };

type ShopProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
};

// 🔥 Convert slug → normal text
const normalize = (text?: string) =>
  text ? text.replace(/-/g, " ").toLowerCase() : "";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export default function ShopLanding({
  cart,
  addToCart,
  totalItems,
  isCartOpen,
  setIsCartOpen,
  increaseQty,
  decreaseQty,
  removeItem,
}: ShopProps) {
  const { category, subCategory } = useParams();

// 🔥 detect category
const isCategory = categoryData.some(
  (c) => slugify(c.name) === category
);

// 🔥 detect brand from product data
const isBrand = products.some(
  (p) => p.brand && slugify(p.brand) === category
);

// 🔥 assign values
const brand = isBrand && !isCategory ? category : "";
const actualCategory = isCategory ? category : "";
  const navigate = useNavigate();

  

  // 🔥 FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
  const matchBrand = brand
    ? p.brand && slugify(p.brand) === brand
    : true;

  const matchCategory = actualCategory
    ? p.category.toLowerCase() === normalize(actualCategory)
    : true;

  const matchSubCategory = subCategory
    ? p.subCategory?.toLowerCase() === normalize(subCategory)
    : true;

  return matchBrand && matchCategory && matchSubCategory;
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
  : brand
  ? `${normalize(brand)} products`
  : normalize(actualCategory)}
          </h2>

          {/* SUBCATEGORY FILTER */}
          {actualCategory && ( 
            <div className="flex flex-wrap gap-3 mb-8">
              {categoryData
                .find(
                  (c) =>
                    c.name.toLowerCase() === normalize(actualCategory)
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
<ShopFooter />
    </div>
  );
}