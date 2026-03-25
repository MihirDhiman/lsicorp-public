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
  const finalPrice = product.discountPrice || product.price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN").format(price);

  // 🎯 Variant styles
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  return (
    <div
      className={`
        border rounded-2xl bg-white group transition duration-300
        ${isHero ? "p-6 shadow-2xl scale-105" : "p-4 hover:shadow-xl"}
        ${isCompact ? "p-3 text-sm" : ""}
      `}
    >
      {/* 🖼️ Image */}
      <div
        className={`
          relative bg-gray-100 rounded-xl overflow-hidden mb-4
          ${isHero ? "h-60" : isCompact ? "h-32" : "h-48"}
        `}
      >
        {/* 🔥 Discount */}
        {product.discountPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            )}% OFF
          </span>
        )}

        {/* ❌ Out of stock */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-semibold">
            Out of Stock
          </div>
        )}

        <img
          src={product.thumbnail}
          alt={product.name}
          onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* 🏷️ Tags */}
      {!isCompact && (
        <div className="flex flex-wrap gap-2 mb-2">
          {product.tags?.map((tag, index) => (
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
          isHero ? "text-xl" : "text-lg"
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
      <div className="flex items-center gap-2 mb-3">
        <span className={`font-bold ${isHero ? "text-xl" : "text-lg"}`}>
          ₹{formatPrice(finalPrice)}
        </span>

        {product.discountPrice && (
          <span className="text-sm line-through text-gray-400">
            ₹{formatPrice(product.price)}
          </span>
        )}
      </div>

      {/* 🛒 Button */}
      {!isCompact && (
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.isAvailable}
          className={`w-full py-2 rounded-xl transition ${
            product.isAvailable
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {product.isAvailable ? "Add to Cart" : "Out of Stock"}
        </button>
      )}
    </div>
  );
}