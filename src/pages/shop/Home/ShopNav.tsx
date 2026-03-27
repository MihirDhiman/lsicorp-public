import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Logo from "../Image/logo.png";
import { categoryData, brandData } from "../Home/Data/ProductsData";

import {
  Grid,
  Home,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

type ShopNavProps = {
  totalItems: number;
  onCartClick: () => void;
};

// 🔥 Convert text → URL slug
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export default function ShopNav({ totalItems, onCartClick }: ShopNavProps) {
  const [isDesktopCategoryOpen, setIsDesktopCategoryOpen] = useState(false);
  const [isDesktopCategoryPinned, setIsDesktopCategoryPinned] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isDesktopBrandsOpen, setIsDesktopBrandsOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // CATEGORY CLOSE
      setIsDesktopCategoryOpen(false);
      setIsDesktopCategoryPinned(false);

      // BRANDS CLOSE
      setIsDesktopBrandsOpen(false);

      // PROFILE CLOSE
      if (profileRef.current && !profileRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b shadow-sm">
      <div className="flex items-center justify-between h-[64px] px-4 sm:px-8">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => handleNavigate("/")}
        >
          <img src={Logo} alt="LSI Corp" className="w-10 h-10" />
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-10">
          {" "}
          {/* Home */}
          <button
            onClick={() => handleNavigate("/home")}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <Home size={16} /> Home
          </button>
          {/* Shop */}
          <button
            onClick={() => handleNavigate("/shop")}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            <ShoppingBag size={16} /> Shop
          </button>
          {/* CATEGORY DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() =>
              !isDesktopCategoryPinned && setIsDesktopCategoryOpen(true)
            }
            onMouseLeave={() =>
              !isDesktopCategoryPinned && setIsDesktopCategoryOpen(false)
            }
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDesktopCategoryPinned((prev) => {
                  const next = !prev;
                  setIsDesktopCategoryOpen(next);
                  return next;
                });
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition"
            >
              <Grid size={16} /> Categories
            </button>

            {(isDesktopCategoryOpen || isDesktopCategoryPinned) && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,1100px)] -translate-x-1/2 rounded-2xl border bg-white p-4 shadow-2xl sm:p-6 lg:p-8 max-h-[70vh] overflow-y-auto"
              >
                {/* Arrow */}
                <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t bg-white"></div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-10">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="space-y-3">
                      {/* CATEGORY */}
                      <h4
                        className="flex items-center gap-2 font-semibold text-black cursor-pointer hover:text-gray-700"
                        onClick={() => {
                          navigate(`/shop/${slugify(cat.name)}`);
                          setIsDesktopCategoryOpen(false);
                          setIsDesktopCategoryPinned(false);
                          setIsMobileCategoryOpen(false);
                          setIsMobileMenuOpen(false);
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
                                `/shop/${slugify(cat.name)}/${slugify(sub)}`,
                              );
                              setIsDesktopCategoryOpen(false);
                              setIsDesktopCategoryPinned(false);
                              setIsMobileCategoryOpen(false);
                              setIsMobileMenuOpen(false);
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
          {/* BRANDS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setIsDesktopBrandsOpen(true)}
            onMouseLeave={() => setIsDesktopBrandsOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDesktopBrandsOpen((prev) => !prev);
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition"
            >
              <Grid size={16} /> Brands
            </button>

            {isDesktopBrandsOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,300px)] -translate-x-1/2 rounded-2xl border bg-white p-4 shadow-2xl sm:p-6 max-h-[70vh] overflow-y-auto"
              >
                {/* Arrow */}
                <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t bg-white"></div>

                {/* Brands List */}
                <div className="space-y-2">
                  {brandData.map((brand) => (
                    <div
                      key={brand.name}
                      onClick={() => {
                        navigate(`/shop/${slugify(brand.name)}`);
                        setIsDesktopBrandsOpen(false);
                        setIsMobileBrandsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 cursor-pointer rounded-lg transition"
                    >
                      {brand.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Contact */}
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition">
            Contact
          </button>
        </nav>

        {/* Mobile menu, Cart & Login */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login */}
          <div ref={profileRef} className="relative">
            {isLoggedIn ? (
              <>
                {/* 👤 ICON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 IMPORTANT
                    setOpen((prev) => !prev);
                  }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <User size={18} />
                </button>

                {/* 🔽 DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50">
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={16} className="text-gray-600" />
                      </div>
                      Profile
                    </button>

                    <button
                      onClick={() => navigate("/orders")}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <Package size={16} /> Orders
                    </button>

                    <button
                      onClick={() => navigate("/settings")}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      <Settings size={16} /> Settings
                    </button>

                    <div className="my-2 h-px bg-gray-100"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen((v) => {
                const next = !v;
                if (!next) {
                  setIsDesktopCategoryOpen(false);
                  setIsDesktopCategoryPinned(false);
                  setIsMobileCategoryOpen(false);
                  setIsDesktopBrandsOpen(false);
                  setIsMobileBrandsOpen(false);
                }
                return next;
              })
            }
            className="lg:hidden inline-flex items-center justify-center text-black p-2 rounded-xl hover:bg-gray-100 transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition">
          <div className="px-4 py-4 space-y-3">
            {/* Home */}
            <button
              type="button"
              onClick={() => handleNavigate("/home")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black w-full justify-start"
            >
              <Home size={16} /> Home
            </button>

            {/* Shop */}
            <button
              type="button"
              onClick={() => handleNavigate("/shop")}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black w-full justify-start"
            >
              <ShoppingBag size={16} /> Shop
            </button>

            {/* CATEGORY DROPDOWN (mobile) */}
            <div className="w-full">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileCategoryOpen((prev) => !prev);
                }}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-sm text-gray-600 transition hover:text-black"
              >
                <span className="flex items-center gap-2">
                  <Grid size={16} /> Categories
                </span>
                <span className="text-xs text-gray-500">
                  {isMobileCategoryOpen ? "Hide" : "Show"}
                </span>
              </button>

              {isMobileCategoryOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 w-full rounded-2xl border bg-white p-3 shadow-lg sm:p-4 max-h-[55vh] overflow-y-auto"
                >
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                    {categoryData.map((cat) => (
                      <div key={cat.name} className="space-y-3">
                        <h4
                          className="flex items-center gap-2 font-semibold text-black cursor-pointer hover:text-gray-700"
                          onClick={() => {
                            navigate(`/shop/${slugify(cat.name)}`);
                            setIsDesktopCategoryOpen(false);
                            setIsDesktopCategoryPinned(false);
                            setIsMobileCategoryOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {cat.icon}
                          {cat.name}
                        </h4>

                        <ul className="space-y-2">
                          {cat.subcategories.map((sub) => (
                            <li
                              key={sub}
                              onClick={() => {
                                navigate(
                                  `/shop/${slugify(cat.name)}/${slugify(sub)}`,
                                );
                                setIsDesktopCategoryOpen(false);
                                setIsDesktopCategoryPinned(false);
                                setIsMobileCategoryOpen(false);
                                setIsMobileMenuOpen(false);
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

            {/* BRANDS DROPDOWN (mobile) */}
            <div className="w-full">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileBrandsOpen((prev) => !prev);
                }}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-sm text-gray-600 transition hover:text-black"
              >
                <span className="flex items-center gap-2">
                  <Grid size={16} /> Brands
                </span>
                <span className="text-xs text-gray-500">
                  {isMobileBrandsOpen ? "Hide" : "Show"}
                </span>
              </button>

              {isMobileBrandsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 w-full rounded-2xl border bg-white p-3 shadow-lg sm:p-4 max-h-[55vh] overflow-y-auto"
                >
                  <div className="space-y-2">
                    {brandData.map((brand) => (
                      <div
                        key={brand.name}
                        onClick={() => {
                          navigate(`/shop/${slugify(brand.name)}`);
                          setIsDesktopBrandsOpen(false);
                          setIsMobileBrandsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="px-3 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 cursor-pointer rounded-lg transition"
                      >
                        {brand.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-black w-full text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
