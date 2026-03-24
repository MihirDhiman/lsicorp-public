import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const Link = ({ href, children, className, onClick }: any) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
);

const Image = ({ src, alt, width, height, className, style }: any) => (
  <img src={src} alt={alt} width={width} height={height} className={className} style={style} />
);

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  
  // 1. STATE VARIABLES FOR DROPDOWNS
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  const [mobileServices, setMobileServices] = useState({
    open: false,
    servicesOpen: false,
    productsOpen: false,
  });

  // 2. REFS FOR DROPDOWNS
  const dropdownRefs = {
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    markets: useRef<HTMLDivElement>(null),
    brands: useRef<HTMLDivElement>(null),
    careers: useRef<HTMLDivElement>(null),
  };

  // Helper to close all dropdowns except one currently being opened
  const toggleDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>, currentState: boolean) => {
    // Close all others first
    setAboutOpen(false);
    setServicesOpen(false);
    setMarketsOpen(false);
    setBrandsOpen(false);
    setCareersOpen(false);
    setter(!currentState);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownSetters: { [key: string]: React.Dispatch<React.SetStateAction<boolean>> } = {
        about: setAboutOpen,
        services: setServicesOpen,
        markets: setMarketsOpen,
        brands: setBrandsOpen,
        careers: setCareersOpen,
      };

      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          dropdownSetters[key](false);
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      setSearchOpen(false); 
      setSearchValue('');
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue('');
  };

  const InnerDropdownItem = ({ name, links, closeParent }: { name: string, links: { href: string, label: string }[], closeParent: () => void }) => {
    const [innerOpen, setInnerOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault(); 
            setInnerOpen(!innerOpen);
          }}
          className={`w-full text-left flex justify-between items-center px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base transition-colors duration-200`}
        >
          {name}
          <svg className={`w-3 h-3 transition-transform duration-200 ${innerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {innerOpen && (
          <div className="pl-6 pt-1 pb-1 bg-black/80">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={closeParent}
                className="block py-1 text-white hover:text-red-500 font-normal text-xs sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };


  const getDropdownContent = (name: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const closeParent = () => setter(false);

    switch (name) {
      case 'Services & Products':
        return (
          <>
            <Link href="/service-products" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Services & Products Overview</Link>
            
            <InnerDropdownItem
              name="Services"
              closeParent={closeParent}
              links={[
                { href: "/services/lighting-displays", label: "Professional Services" },
                { href: "/services/digital-solutions", label: "Security Integration" },
                { href: "/services/energy-services", label: "Solar % EV - Future Service" },
              ]}
            />
            
            <InnerDropdownItem
              name="Products"
              closeParent={closeParent}
              links={[
                { href: "/products/exterior", label: "Digital Signage" },
                { href: "/products/interior", label: "Display Fixtures" },
                { href: "/products/digital", label: "Graphics" },
                { href: "/products/digital", label: "Lighting" },
                { href: "/products/digital", label: "Printed Circuit Boards " },
              ]}
            />
          </>
        );
      case 'Vertical Markets':
        return (
          <>
            <Link href="/vertical-markets" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Vertical Market Overview</Link>
            <Link href="/vertical-markets/automotive" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Automotive</Link>
            <Link href="/vertical-markets/grocery" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Grocery</Link>
            <Link href="/vertical-markets/parking" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Parking</Link>
            <Link href="/vertical-markets/quick-service-restaurant" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Quick Service Restaurant</Link>
            <Link href="/vertical-markets/refueling-convenience-store" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Refueling & Convenience Store</Link>
            <Link href="/vertical-markets/retail-office" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Retail & Office</Link>
            <Link href="/vertical-markets/sports-venue" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Sports Venue</Link>
            <Link href="/vertical-markets/warehouse" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Warehouse</Link>
            <Link href="/vertical-markets/additional-markets" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Additional Markets</Link>
          </>
        );
      case 'Brands':
        return (
          <>
            <Link href="/brands" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Brands Overview</Link>
            <Link href="/brands/adl-technology" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">ADL Technology</Link>
            <Link href="/brands/atlas-lighting-products" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Atlas Lighting Products</Link>
            <Link href="/brands/canadas-best-store-fixtures" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Canada&apos;s Best Store Fixtures</Link>
            <Link href="/brands/emi-industries" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">EMI Industries</Link>
            <Link href="/brands/jsi-store-fixtures" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">JSI Store Fixutres</Link>
            <Link href="/brands/lsi-adapt" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">LSI ADAPT</Link>
            <Link href="/brands/lsi-digital" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">LSI Digital</Link>
            <Link href="/brands/lsi-brand-imaging" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">LSI Brand Imaging</Link>
            <Link href="/brands/lsi-lighting" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">LSI Lighting</Link>
          </>
        );
      case 'Careers':
        return (
          <>
            <Link href="/careers" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Career Overview</Link>
            <Link href="/careers/benefits" onClick={closeParent} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Benefits</Link>
          </>
        );
      default:
        return null;
    }
  };

  const DropdownToggle = ({ name, isOpen, setter, ref }: { name: string, isOpen: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, ref: any }) => (
    <div ref={ref as any} className="relative">
      <button
        onClick={() => toggleDropdown(setter, isOpen)}
        className="hover:text-red-500 transition-colors duration-200 flex items-center gap-1 font-bold whitespace-nowrap"
      >
        {name}
        <svg className={`w-3 h-3 mt-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-75 bg-black shadow-lg py-2 z-50 border-t-4 border-[#AB2328]">
          {getDropdownContent(name, setter)}
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/100' : 'bg-black/1'
        } `}
    >
      <div className="w-full px-4 md:px-6 py-4 relative z-10">
        <div className="max-w-[2400px] mx-auto flex items-center justify-between gap-2 md:gap-4">
          {/* LOGO (FAR LEFT) */}
          <Link href="/home" className="flex items-center flex-shrink-0">
            <div className="
                min-w-10 min-h-10 w-10 h-10
                sm:min-w-12 sm:min-h-12 sm:w-12 sm:h-12
                md:min-w-14 md:min-h-14 md:w-14 md:h-14
                flex items-center justify-center rounded-full overflow-hidden shrink-0
              ">
              <Image
                src="/logo.png"
                alt="LSI Logo"
                width={72}
                height={72}
                className="object-contain"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </Link>

          {/* DESKTOP RIGHT SECTION - Navigation, Search, and Stock Ticker */}
          <div className="hidden lg:flex flex-1 items-center justify-end relative h-full">
            
            {/* DESKTOP SEARCH INPUT (Overlays navigation when open) */}
            <div className={`absolute right-0 h-full flex items-center transition-all duration-300 ${searchOpen ? 'opacity-100 w-[500px]' : 'opacity-0 pointer-events-none w-0'}`}>
              <form onSubmit={handleSearch} className="flex flex-1 items-center bg-white border border-gray-300 rounded-lg pr-2 py-1 shadow-md mr-3">
                <input
                  ref={searchInputRef}
                  type="search"
                  name="s"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 border-0 outline-none text-base text-gray-700 placeholder-gray-400 bg-transparent px-4 py-1"
                />
                <button
                  type="submit"
                  className="text-red-500 p-2 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Submit Search"
                >
                  <Search size={22} />
                </button>
              </form>
              
              <button
                type="button"
                onClick={closeSearch}
                className="bg-red-500 hover:bg-red-600 hover:text-black text-white w-8 h-8 rounded-full transition-colors flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-lg"
                aria-label="Close Search"
              >
                ✖
              </button>
            </div>

            {/* Combined Navigation, Search Icon, and Stock Ticker (visible when search is closed) */}
            <div className={`flex items-center h-full relative transition-all duration-300 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              
              {/* DESKTOP NAVIGATION LINKS */}
              <nav className={`flex items-center gap-3 xl:gap-4 text-sm md:text-base text-white relative`}>
                <Link href="/home" className="hover:text-red-500 transition-colors font-bold duration-200">Home</Link>
        
                {/* About Dropdown (Original structure) */}
                <div ref={dropdownRefs.about} className="relative">
                  <button
                    onClick={() => toggleDropdown(setAboutOpen, aboutOpen)}
                    className="hover:text-red-500 transition-colors duration-200 flex items-center gap-1 font-bold whitespace-nowrap"
                  >
                    About LSI
                    <svg className={`w-3 h-3 mt-0.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {aboutOpen && (
                    <div className="absolute top-full left-0 mt-2 w-88 sm:w-56 bg-black shadow-lg py-2 z-50 border-t-4 border-[#AB2328]">
                      <Link href="/about-lsi" onClick={() => setAboutOpen(false)} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">About LSI Overview</Link>
                      <Link href="/about-lsi/lsi-leadership" onClick={() => setAboutOpen(false)} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">LSI Leadership</Link>
                      <Link href="/about-lsi/history" onClick={() => setAboutOpen(false)} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">History</Link>
                      <Link href="/about-lsi/sustainability" onClick={() => setAboutOpen(false)} className="block px-3 sm:px-4 py-2 text-white hover:text-red-500 font-bold text-xs sm:text-base">Sustainability</Link>
                    </div>
                  )}
                </div>

                {/* Services & Products Dropdown - WITH NESTED DROPDOWNS */}
                <DropdownToggle
                  name="Services & Products"
                  isOpen={servicesOpen}
                  setter={setServicesOpen}
                  ref={dropdownRefs.services}
                />
        
                {/* Vertical Markets Dropdown */}
                <DropdownToggle
                  name="Vertical Markets"
                  isOpen={marketsOpen}
                  setter={setMarketsOpen}
                  ref={dropdownRefs.markets}
                />
        
                {/* Brands Dropdown */}
                <DropdownToggle
                  name="Brands"
                  isOpen={brandsOpen}
                  setter={setBrandsOpen}
                  ref={dropdownRefs.brands}
                />
                
                {/* Investors (Static Link) */}
                <Link href="/investors" className="hover:text-red-500 transition-colors duration-200 font-bold whitespace-nowrap">Investors</Link>
                
                {/* Careers Dropdown */}
                <DropdownToggle
                  name="Careers"
                  isOpen={careersOpen}
                  setter={setCareersOpen}
                  ref={dropdownRefs.careers}
                />
                
                {/* Media (Static Link) */}
                <Link href="/media" className="hover:text-red-500 transition-colors duration-200 font-bold whitespace-nowrap">Media</Link>
                 {/* Shop (Static Link) */}
                <Link href="/shop" className="hover:text-red-500 transition-colors duration-200 font-bold whitespace-nowrap">Shop</Link>
              </nav>

              {/* Search Toggle Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`text-white hover:text-red-500 transition-colors ml-4 flex-shrink-0`}
                aria-label="Toggle Search"
              >
                <Search size={18} />
              </button>

              {/* Stock Ticker */}
              <div className="font-bold text-xs whitespace-nowrap text-white ml-4">
                <span className="text-white">LYTS 17.62</span>
                <span className="text-white/60 font-medium ml-1">-0.73</span>
              </div>
            </div>
          </div>

          {/* MOBILE SECTION  */}
          <div className="lg:hidden flex items-center gap-6 ml-auto">
            <div className="font-bold text-sm whitespace-nowrap text-white">
              LYTS 17.62-0.73
            </div>
            <button onClick={() => setSearchOpen(true)} className="text-white hover:text-red-500 transition-colors flex-shrink-0" aria-label="Open Mobile Search">
              <Search size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-xl sm:text-2xl flex-shrink-0" aria-label="Toggle Mobile Menu">
              {mobileOpen ? '✖' : '☰'}
            </button>
          </div>
          
        </div>
      </div>

      {/* MOBILE MENU  */}
      {mobileOpen && (
        <div className="lg:hidden bg-black text-white w-full py-2 relative z-20 space-y-1">

          {/* HOME */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2 hover:bg-red-500 text-xs sm:text-sm"
          >
            Home
          </Link>

          {/* ABOUT LSI DROPDOWN */}
          <button
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-red-500 text-xs sm:text-sm font-bold"
          >
            About LSI
            <span className={`transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}>⌄</span>
          </button>
          
          {mobileAboutOpen && (
            <div className="bg-black/90 pl-6 space-y-1">
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-red-400 text-xs">About LSI Overview</Link>
              <Link href="/about-lsi/lsi-leadership" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-red-400 text-xs">LSI Leadership</Link>
              <Link href="/about-lsi/history" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-red-400 text-xs">History</Link>
              <Link href="/about-lsi/sustainability" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-red-400 text-xs">Sustainability</Link>
            </div>
          )}
      
          {/* SERVICES & PRODUCTS DROPDOWN */}
          <button
            onClick={() =>
              setMobileServices(prev => ({
                ...prev,
                open: !prev.open
              }))
            }
            className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-red-500 text-xs sm:text-sm font-bold"
          >
            Services & Products
            <span className={`transition-transform ${mobileServices.open ? 'rotate-180' : ''}`}>⌄</span>
          </button>

          {mobileServices.open && (
            <div className="bg-black/90 pl-6 space-y-1">

              {/* Overview */}
              <Link
                href="/service-products"
                onClick={() => {
                  setMobileServices({ open: false, servicesOpen: false, productsOpen: false })
                  setMobileOpen(false)   // ADD THIS
                }}
                className="block py-2 hover:text-red-400 text-xs font-bold"
              >
                Overview
              </Link>

              {/* Nested Services */}
              <button
                onClick={() =>
                  setMobileServices(prev => ({
                    ...prev,
                    servicesOpen: !prev.servicesOpen
                  }))
                }
                className="w-full flex justify-between py-2 font-bold text-xs"
              >
                Services
                <span className={`${mobileServices.servicesOpen ? 'rotate-180' : ''}`}>⌄</span>
              </button>

              {mobileServices.servicesOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/services/lighting-displays" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Professional Services</Link>
                  <Link href="/services/digital-solutions" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Security Integration</Link>
                  <Link href="/services/energy-services" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Solar & EV Future Service</Link>
                </div>
              )}

              {/* Nested Products */}
              <button
                onClick={() =>
                  setMobileServices(prev => ({
                    ...prev,
                    productsOpen: !prev.productsOpen
                  }))
                }
                className="w-full flex justify-between py-2 font-bold text-xs"
              >
                Products
                <span className={`${mobileServices.productsOpen ? 'rotate-180' : ''}`}>⌄</span>
              </button>

              {mobileServices.productsOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/products/exterior" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Digital Signage</Link>
                  <Link href="/products/interior" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Display Fixtures</Link>
                  <Link href="/products/digital" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Graphics</Link>
                  <Link href="/products/digital" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Lighting</Link>
                  <Link href="/products/digital" onClick={() => setMobileServices({ open: false, servicesOpen: false, productsOpen: false })} className="block py-1 text-xs hover:text-red-400">Printed Circuit Boards</Link>
                </div>
              )}
            </div>
          )}

          {/* VERTICAL MARKETS DROPDOWN */}
          <button
            onClick={() => setMobileMarketsOpen(!mobileMarketsOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-red-500 text-xs sm:text-sm font-bold"
          >
            Vertical Markets
            <span className={`transition-transform ${mobileMarketsOpen ? 'rotate-180' : ''}`}>⌄</span>
          </button>

          {mobileMarketsOpen && (
            <div className="bg-black/90 pl-6 space-y-1">
              <Link href="/vertical-markets" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Overview</Link>
              <Link href="/vertical-markets/automotive" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Automotive</Link>
              <Link href="/vertical-markets/grocery" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Grocery</Link>
              <Link href="/vertical-markets/parking" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Parking</Link>
              <Link href="/vertical-markets/quick-service-restaurant" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Quick Service Restaurant</Link>
              <Link href="/vertical-markets/refueling-convenience-store" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Refueling & Convenience</Link>
              <Link href="/vertical-markets/retail-office" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Retail & Office</Link>
              <Link href="/vertical-markets/sports-venue" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Sports Venue</Link>
              <Link href="/vertical-markets/warehouse" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Warehouse</Link>
              <Link href="/vertical-markets/additional-markets" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Additional Markets</Link>
            </div>
          )}

          {/* BRANDS DROPDOWN */}
          <button
            onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-red-500 text-xs sm:text-sm font-bold"
          >
            Brands
            <span className={`transition-transform ${mobileBrandsOpen ? 'rotate-180' : ''}`}>⌄</span>
          </button>

          {mobileBrandsOpen && (
            <div className="bg-black/90 pl-6 space-y-1">
              <Link href="/brands" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>Overview</Link>
              <Link href="/brands/adl-technology" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>ADL Technology</Link>
              <Link href="/brands/atlas-lighting-products" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>Atlas Lighting Products</Link>
              <Link href="/brands/canadas-best-store-fixtures" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>Canada&apos;s Best Store Fixtures</Link>
              <Link href="/brands/emi-industries" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>EMI Industries</Link>
              <Link href="/brands/jsi-store-fixtures" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>JSI Store Fixures</Link>
              <Link href="/brands/lsi-adapt" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>LSI ADAPT</Link>
              <Link href="/brands/lsi-digital" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>LSI Digital</Link>
              <Link href="/brands/lsi-brand-imaging" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>LSI Brand Imaging</Link>
              <Link href="/brands/lsi-lighting" className="block py-2 text-xs hover:text-red-400" onClick={() => setMobileOpen(false)}>LSI Lighting</Link>
            </div>
          )}

          {/* SIMPLE LINKS */}
          <Link href="/investors" className="block px-4 py-2 hover:bg-red-500 text-xs sm:text-sm" onClick={() => setMobileOpen(false)}>Investors</Link>

          {/* CAREERS DROPDOWN */}
          <button
            onClick={() => setMobileCareersOpen(!mobileCareersOpen)}
            className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-red-500 text-xs sm:text-sm font-bold"
          >
            Careers
            <span className={`transition-transform ${mobileCareersOpen ? 'rotate-180' : ''}`}>⌄</span>
          </button>

          {mobileCareersOpen && (
            <div className="bg-black/90 pl-6 space-y-1">
              <Link href="/careers" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Career Overview</Link>
              <Link href="/careers/benefits" onClick={() => setMobileOpen(false)} className="block py-2 text-xs hover:text-red-400">Benefits</Link>
            </div>
          )}

          <Link href="/media" className="block px-4 py-2 hover:bg-red-500 text-xs sm:text-sm" onClick={() => setMobileOpen(false)}>Media</Link>
          <Link href="/shop" className="block px-4 py-2 hover:bg-red-500 text-xs sm:text-sm" onClick={() => setMobileOpen(false)}>Shop</Link>
        </div>
      )}

      {/* SEARCH - Mobile dropdown */}
      {searchOpen && (
        <div className="md:block lg:hidden bg-black/95 border-b border-gray-700 relative z-40">
          <form onSubmit={handleSearch} className="px-4 py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="search"
                  name="s"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 border-0 outline-none text-xs sm:text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                />
                <button
                  type="submit"
                  className="text-red-500 hover:text-red-600 transition-colors flex items-center justify-center flex-shrink-0"
                  aria-label="Submit Search"
                >
                  <Search size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeSearch}
                className="bg-red-500 hover:bg-red-600 hover:text-black text-white p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0 text-lg font-bold"
                aria-label="Close Search"
              >
                ✖
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
