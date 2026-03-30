import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "./Data/ProductsData";

type ShopProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  variant?: "default" | "hero" | "compact";
};

export default function ShopProductCard({
  product,
  onAddToCart,
  variant = "default",
}: ShopProductCardProps) {
  const [liked, setLiked] = useState(false);

  const finalPrice = product.discountPrice || product.price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN").format(price);

  const discountPercentage =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : null;

  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  return (
    <div
      className={`
        group relative border rounded-2xl bg-white transition duration-300
        ${isHero ? "p-6 shadow-2xl scale-105" : "p-4 hover:shadow-xl"}
        ${isCompact ? "p-3 text-sm" : ""}
      `}
    >
      {/* 🖼️ Image */}
      <div
        className={`
          relative bg-gray-100 rounded-xl overflow-hidden mb-4
          ${
            isHero
              ? "h-48 sm:h-56 md:h-60"
              : isCompact
                ? "h-28 sm:h-32"
                : "h-40 sm:h-48"
          }
        `}
      >
        {/* 🔥 Discount */}
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}

        {/* ❌ Out of stock */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-semibold z-10">
            Out of Stock
          </div>
        )}

        {/* ❤️ Wishlist */}
        {!isCompact && (
          <button
            onClick={() => setLiked(!liked)}
            className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full shadow transition z-10 ${
              liked
                ? "bg-red-500 text-white"
                : "bg-white hover:text-red-500"
            }`}
          >
            <Heart size={14} fill={liked ? "white" : "none"} />
          </button>
        )}

        <img
          src={product.thumbnail}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* ⚡ Hover Actions */}
        {!isCompact && (
          <div className="absolute bottom-3 left-3 right-3 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
            <div className="flex gap-2">
              <button className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-gray-100">
                <Eye size={14} /> View
              </button>

              <button
                disabled={!product.isAvailable}
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-black text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-gray-800 disabled:opacity-50"
              >
                <ShoppingBag size={14} /> Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🏷️ Tags */}
     {/* 🏷️ Tags */}
{!isCompact && (product.tags ?? []).length > 0 && (
  <div className="flex flex-wrap gap-2 mb-2">
    {(product.tags ?? []).map((tag, index) => (
      <span
        key={index}
        className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full"
      >
        {tag}
      </span>
    ))}
  </div>
)}
     

      {/* 🧾 Name */}
      <h4
        className={`font-semibold line-clamp-1 ${
          isHero ? "text-lg sm:text-xl" : "text-base sm:text-lg"
        }`}
      >
        {product.name}
      </h4>

      {/* ⭐ Rating */}
      {!isCompact && (
        <div className="text-sm text-gray-500 mb-1">
          ⭐ {product.rating} ({product.reviewsCount})
        </div>
      )}

      {/* 💰 Price */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className={`font-bold ${isHero ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
            ₹{formatPrice(finalPrice)}
          </span>

          {product.discountPrice && (
            <div className="text-xs text-gray-400 line-through">
              ₹{formatPrice(product.price)}
            </div>
          )}
        </div>

        {product.isAvailable && !isCompact && (
          <span className="text-xs text-green-600 font-semibold">
            In Stock
          </span>
        )}
      </div>

      {/* 🛒 Button */}
      {!isCompact && (
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.isAvailable}
          className={`
            w-full py-2 rounded-xl transition flex items-center justify-center gap-2 text-sm font-semibold
            ${
              product.isAvailable
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          <ShoppingBag size={16} />
          {product.isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>
      )}
    </div>
  );
}