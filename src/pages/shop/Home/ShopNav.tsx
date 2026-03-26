import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Image/logo.png";
import { categoryData } from "../Home/Data/ProductsData";

import {
  Grid,
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

type ShopNavProps = {
  totalItems: number;
  onCartClick: () => void;
};

// 🔥 Convert text → URL slug
const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export default function ShopNav({ totalItems, onCartClick }: ShopNavProps) {
  const [active, setActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

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

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="LSI Corp" className="w-10 h-10" />
        </div>

        {/* Nav */}
        <nav className="flex items-center ml-20 gap-8">

          {/* Home */}
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
          >
            <Home size={16} /> Home
          </button>

          {/* Shop */}
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
          >
            <ShoppingBag size={16} /> Shop
          </button>

          {/* CATEGORY DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => !isClicked && setActive(true)}
            onMouseLeave={() => !isClicked && setActive(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
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
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[1100px] bg-white shadow-2xl rounded-2xl border p-8 z-50"
              >
                {/* Arrow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t"></div>

                {/* Grid */}
                <div className="grid grid-cols-4 gap-x-16 gap-y-10">

                  {categoryData.map((cat) => (
                    <div key={cat.name} className="space-y-3">

                      {/* CATEGORY */}
                      <h4
                        className="flex items-center gap-2 font-semibold text-black cursor-pointer hover:text-gray-700"
                        onClick={() => {
                          navigate(`/shop/${slugify(cat.name)}`);
                          setActive(false);
                          setIsClicked(false);
                        }}
                      >
                        {cat.icon}
                        {cat.name}
                      </h4>

                      {/* SUBCATEGORIES */}
                      <ul className="space-y-2">
                        {cat.subcategories.map((sub) => (
                          <li
                            key={sub}
                            onClick={() => {
                              navigate(
                                `/shop/${slugify(cat.name)}/${slugify(sub)}`
                              );
                              setActive(false);
                              setIsClicked(false);
                            }}
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

          {/* Contact */}
          <button className="text-sm text-gray-600 hover:text-black">
            Contact
          </button>

        </nav>

        {/* Cart & Login */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 text-black px-2 py-2 rounded-xl transition"
          >
            <ShoppingCart size={18} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-black px-2 py-2 rounded-xl  transition"
          >
            <User size={18} />
            Login
          </button>
        </div>

      </div>
    </header>
  );
}