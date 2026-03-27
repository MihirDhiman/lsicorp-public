import { products } from "./Data/ProductsData";
import type { Product } from "./Data/ProductsData";
import ShopProductCard from "./ShopProductCard";

type ShopHeroProps = {
  title?: string;
  subtitle?: string;
  onShopClick?: () => void;
  onExploreClick?: () => void;
  onAddToCart: (product: Product) => void;
};

export default function ShopHero({
  title = "Elevate Your Everyday with Intelligent Shopping",
  subtitle = "Experience a new era of premium commerce — curated, fast, and beautifully designed.",
  onShopClick,
  onExploreClick,
  onAddToCart,
}: ShopHeroProps) {
  const featured: Product =
    products.find((p) => p.tags?.includes("premium")) || products[0];
  const secondary = products.slice(1, 3);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-12 sm:py-16 md:py-20">
      {/* 🌈 Dynamic Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-purple-100/50 rounded-full blur-[120px] -top-44 -left-28 animate-pulse" />
        <div className="absolute w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] bg-blue-100/50 rounded-full blur-[100px] -bottom-20 -right-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
        {/* 🧾 LEFT CONTENT (UNCHANGED LOGIC) */}
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 text-[10px] font-bold tracking-widest bg-black text-white rounded-full">
            NEW EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              onClick={onShopClick}
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 font-medium"
            >
              Shop Now →
            </button>
            <button
              onClick={onExploreClick}
              className="border border-gray-200 bg-white/50 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-gray-50 transition-all font-medium"
            >
              Explore
            </button>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-6">
            {[
              { v: "10K+", l: "Products" },
              { v: "5K+", l: "Customers" },
              { v: "4.8★", l: "Rating" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-black font-bold text-lg sm:text-xl">{s.v}</p>
                <p className="text-gray-400 text-xs uppercase tracking-tighter font-semibold">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🎨 ELITE RIGHT VISUAL (REIMAGINED) */}
       
<div className="relative h-[420px] sm:h-[480px] md:h-[550px] w-full flex items-center justify-center group">
  {/* 🧊 Secondary Card 1 (Back Left) */}
  <div className="absolute top-10 sm:top-12 left-2 sm:left-4 w-[160px] sm:w-[190px] md:w-[200px] z-10 transition-all duration-700 ease-out 
    opacity-40 group-hover:opacity-100 group-hover:translate-x-[-20px] group-hover:translate-y-[-10px] group-hover:-rotate-12 blur-[1px] group-hover:blur-0">
    <div className="scale-90 shadow-xl rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
      <ShopProductCard
        product={secondary[0]}
        onAddToCart={() => onAddToCart(secondary[0])}
      />
    </div>
  </div>

  {/* 🧊 Secondary Card 2 (Back Right) */}
  <div className="absolute bottom-10 sm:bottom-12 right-2 sm:right-4 w-[160px] sm:w-[190px] md:w-[200px] z-10 transition-all duration-700 ease-out 
    opacity-40 group-hover:opacity-100 group-hover:translate-x-[20px] group-hover:translate-y-[10px] group-hover:rotate-12 blur-[1px] group-hover:blur-0">
    <div className="scale-90 shadow-xl rounded-3xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
      <ShopProductCard
        product={secondary[1]}
        onAddToCart={() => onAddToCart(secondary[1])}
      />
    </div>
  </div>

  {/* 💎 Main Feature (Center Stage) */}
  <div className="relative w-[260px] sm:w-[310px] md:w-[340px] z-30 transition-all duration-500 ease-out transform 
    group-hover:scale-105 group-hover:-rotate-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]">
    <ShopProductCard
      product={featured}
      onAddToCart={() => onAddToCart(featured)}
    />
    
    {/* Contextual Badge */}
    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white shadow-lg border border-gray-100 px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 animate-bounce">
      <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
      <span className="text-[10px] font-bold text-black tracking-tight uppercase">In Stock</span>
    </div>
  </div>

  {/* 💠 Decorative Stage Background */}
  <div className="absolute inset-0 flex items-center justify-center -z-10">
    <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] border border-dashed border-gray-200 rounded-full animate-[spin_20s_linear_infinite]" />
    <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] bg-gradient-to-br from-purple-200/40 to-blue-200/40 blur-3xl rounded-full" />
  </div>
</div>
</div>
    </section>
  );
}
