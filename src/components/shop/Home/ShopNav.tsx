import { useState , useEffect} from "react";
import {
  Smartphone,
  WashingMachine,
  Shirt,
  Sofa,
  Sparkles,
  Car,
  Dumbbell,
  BookOpen,
  ShoppingCart,
  Home,
  ShoppingBag,
  Grid,
} from "lucide-react";
import Logo from "../Image/logo.png";
type ShopNavProps = {
  totalItems: number;
  onCartClick: () => void;
};

export const categoryData = [
  {
    name: "Electronics",
    icon: <Smartphone size={18} />,
    subcategories: ["Mobiles", "Laptops", "Headphones", "Televisions", "Cameras", "Smart Watches"],
  },
  {
    name: "Appliances",
    icon: <WashingMachine size={18} />,
    subcategories: ["Refrigerators", "Washing Machines", "Air Conditioners", "Microwave Ovens", "Water Purifiers"],
  },
  {
    name: "Fashion",
    icon: <Shirt size={18} />,
    subcategories: ["Men", "Women", "Kids", "Footwear", "Accessories"],
  },
  {
    name: "Home & Furniture",
    icon: <Sofa size={18} />,
    subcategories: ["Furniture", "Home Decor", "Lighting", "Kitchen", "Storage"],
  },
  {
    name: "Beauty & Personal Care",
    icon: <Sparkles size={18} />,
    subcategories: ["Makeup", "Skincare", "Haircare", "Fragrances", "Grooming"],
  },
  {
    name: "Auto Accessories",
    icon: <Car size={18} />,
    subcategories: ["Car Accessories", "Bike Accessories", "Helmets", "Car Electronics", "Oils & Fluids"],
  },
  {
    name: "Sports & Fitness",
    icon: <Dumbbell size={18} />,
    subcategories: ["Gym Equipment", "Cricket", "Football", "Yoga", "Outdoor Sports"],
  },
  {
    name: "Books & Education",
    icon: <BookOpen size={18} />,
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Children Books", "Stationery"],
  },
];

export default function ShopNav({ totalItems, onCartClick }: ShopNavProps) {
  const [active, setActive] = useState(false);
const [isClicked, setIsClicked] = useState(false);
useEffect(() => {
  const handleClickOutside = () => {
    setActive(false);
    setIsClicked(false);
  };

  const timeout = setTimeout(() => {
    document.addEventListener("click", handleClickOutside);
  }, 100);

  return () => {
    document.removeEventListener("click", handleClickOutside);
    clearTimeout(timeout);
  };
}, []);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">

      <div className="flex items-center gap-2">
  <img src={Logo} alt="LSI Corp" className="w-10 h-10" />

</div>

        {/* Nav */}
        <nav className="flex items-center gap-8">

          <a className="flex items-center gap-1 text-sm text-gray-600 hover:text-black">
            <Home size={16} /> Home
          </a>

          <a className="flex items-center gap-1 text-sm text-gray-600 hover:text-black">
            <ShoppingBag size={16} /> Shop
          </a>

          {/* 🔥 CATEGORY DROPDOWN */}
         <div
  className="relative "
  onMouseEnter={() => {
    if (!isClicked) setActive(true);
  }}
  onMouseLeave={() => {
    if (!isClicked) setActive(false);
  }}
>
  <button
    onClick={(e) => {
      e.stopPropagation(); // ✅ FIX
      setIsClicked((prev) => !prev);
      setActive((prev) => !prev);
    }}
    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
  >
    <Grid size={16} /> Categories
  </button>

  {(active || isClicked) && (
    <div
  onClick={(e) => e.stopPropagation()}
  className="absolute left-1/2 -translate-x-1/2 top-full mt-0 pt-2 w-[1100px] bg-white shadow-2xl rounded-2xl border p-8 z-50 animate-fadeIn"
>
  {/* 🔺 Arrow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

  {/* 🔥 GRID */}
  <div className="grid grid-cols-4 gap-x-16 gap-y-10 py-4">

    {categoryData.map((cat) => (
      <div
        key={cat.name}
        className="min-w-[250px] space-y-3"
      >
        {/* 🧾 Title */}
        <h4 className="flex items-center gap-2 font-semibold text-black text-base">
          {cat.icon}
          {cat.name}
        </h4>

        {/* 📦 Subcategories */}
        <ul className="space-y-2">
          {cat.subcategories.map((sub) => (
            <li
              key={sub}
              className="text-sm text-gray-600 hover:text-black cursor-pointer flex items-center gap-2 transition"
            >
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              {sub}
            </li>
          ))}
        </ul>
      </div>
    ))}

  </div>
</div>
  )}
</div>
  
 

          <a className="text-sm text-gray-600 hover:text-black">
            Contact
          </a>

        </nav>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2  text-black px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          <ShoppingCart size={18} />
          

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>

      </div>
    </header>
  );            
}