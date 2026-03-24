import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Link = ({ href, children, className, onClick }: any) => (
  <a href={href} className={className} onClick={onClick}>
    {children}
  </a>
);

// Use the icons to avoid unused import warnings
const IconUsage = () => {
  return (
    <>
      <FaFacebook className="hidden" />
      <FaInstagram className="hidden" />
      <FaLinkedin className="hidden" />
      <FaXTwitter className="hidden" />
      <FaYoutube className="hidden" />
    </>
  );
};

export default function PublicFooter() {
  return (
    <footer className="bg-black text-gray-300 text-sm pt-10 pb-10">
      {/* Include IconUsage to use the imported icons */}
      <IconUsage />
      <div className="max-w-[120rem] mx-auto w-full px-6 sm:px-10 md:px-14 space-y-10">

        {/* BRAND LOGOS — DESKTOP (≥1200px) */}
        <div className="hidden xl:flex justify-center w-full px-4">
          <div
            className="
              flex 
              flex-nowrap 
              overflow-x-auto 
              gap-10 
              opacity-90 
              scrollbar-hide 
              whitespace-nowrap
              mx-auto
              max-w-full
            "
          >
            <Link href="/brands/lsi-lighting"><img src="/logo-corp_lsi-lighting-white.png" alt="LSI Lighting" className="h-5 md:h-6" /></Link>
            <Link href="/brands/brand-imaging"><img src="/logo-corp_lsi-brand-imaging-white-3.png" alt="Brand Imaging" className="h-5 md:h-6" /></Link>
            <Link href="/brands/digital"><img src="/logo-corp_lsi-digital-white.png" alt="Digital" className="h-5 md:h-6" /></Link>
            <Link href="/brands/adapt"><img src="/logo-corp_lsi-adapt-white.png" alt="ADAPT" className="h-5 md:h-6" /></Link>
            <Link href="/brands/adl"><img src="/logo-corp_adl-white.png" alt="ADL" className="h-5 md:h-6" /></Link>
            <Link href="/brands/jsi"><img src="/logo-corp_jsi-white.png" alt="JSI" className="h-5 md:h-6" /></Link>
            <Link href="/brands/atlas"><img src="/logo-corp_atlas-white.png" alt="Atlas" className="h-5 md:h-6" /></Link>
            <Link href="/brands/emi"><img src="/logo-corp_emi-white.png" alt="EMI" className="h-5 md:h-6" /></Link>
            <Link href="/brands/cabinet"><img src="/logo-corp_cbsf-white.png" alt="Cabinet" className="h-5 md:h-6" /></Link>
          </div>
        </div>

        {/* BRAND LOGOS — MOBILE + TABLET (<1200px) */}
        <div className="xl:hidden grid grid-cols-2 sm:grid-cols-3 gap-6 place-items-center opacity-90 px-4 mx-auto">
          <img src="/logo-corp_lsi-lighting-white.png" className="h-10" />
          <img src="/logo-corp_lsi-brand-imaging-white-3.png" className="h-10" />
          <img src="/logo-corp_lsi-digital-white.png" className="h-10" />
          <img src="/logo-corp_lsi-adapt-white.png" className="h-10" />
          <img src="/logo-corp_adl-white.png" className="h-10" />
          <img src="/logo-corp_jsi-white.png" className="h-10" />
          <img src="/logo-corp_atlas-white.png" className="h-10" />
          <img src="/logo-corp_emi-white.png" className="h-10" />
          <img src="/logo-corp_cbsf-white.png" className="h-10" />
        </div>

        {/* DESKTOP FOOTER (≥1200px) */}
        <div className="hidden xl:flex justify-center ">

           <div className="w-full max-w-[1100px] flex justify-between items-center px-4">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center gap-4">
            
            {/* NAVIGATION */}
            <div className="flex flex-wrap justify-center gap-6 font-bold text-white text-[14px] tracking-wide">
              <a href="#" className="hover:text-red-500 transition">About LSI</a>
              <a href="#" className="hover:text-red-500 transition">Services & Products</a>
              <a href="#" className="hover:text-red-500 transition">Vertical Markets</a>
              <a href="#" className="hover:text-red-500 transition">Brands</a>
              <a href="#" className="hover:text-red-500 transition">Investors</a>
              <a href="#" className="hover:text-red-500 transition">Careers</a>
              <a href="#" className="hover:text-red-500 transition">Media</a>
            </div>

            {/* POLICIES */}
            <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-[14px] font-semibold">
              <a href="#" className="hover:text-red-500 transition">Terms, Conditions & Warranty</a>
              <a href="#" className="hover:text-red-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-red-500 transition">Cookies Policy</a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center gap-4 text-right">

            <p className="text-[12px] text-gray-400">
              © Copyright {new Date().getFullYear()} LSI Industries. All Rights Reserved.
            </p>

            <img src="/logo_smartvision.webp" alt="SmartVision" className="h-7 object-contain" />

            <div className="flex gap-3">
              <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaYoutube className="text-xl" /></a>
              <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaLinkedin className="text-xl" /></a>
              <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaFacebook className="text-xl" /></a>
              <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaXTwitter className="text-xl" /></a>
              <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaInstagram className="text-xl" /></a>
            </div>
            </div>
          </div>
        </div>

        {/* MOBILE + TABLET FOOTER (<1200px) */}
        <div className="flex xl:hidden flex-col items-center space-y-6">

          {/* POLICIES */}
          <div className="flex flex-col items-center gap-4 text-gray-400 text-[14px] font-semibold">
            <a href="#" className="hover:text-red-500 transition">Terms, Conditions & Warranty</a>
            <a href="#" className="hover:text-red-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition">Cookies Policy</a>
          </div>

          {/* COPYRIGHT */}
          <p className="text-[12px] text-gray-400 text-center">
            © Copyright {new Date().getFullYear()} LSI Industries. All Rights Reserved.
          </p>

          {/* SMARTVISION */}
          <img src="/logo_smartvision.png" alt="SmartVision" className="h-7 object-contain" />

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaYoutube className="text-xl" /></a>
            <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaLinkedin className="text-xl" /></a>
            <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaFacebook className="text-xl" /></a>
            <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaXTwitter className="text-xl" /></a>
            <a className="bg-neutral-800 hover:bg-red-700 rounded-full p-2"><FaInstagram className="text-xl" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
