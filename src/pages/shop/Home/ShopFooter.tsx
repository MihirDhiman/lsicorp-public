import { useNavigate } from "react-router-dom";

// ─── Placeholder stubs (replace with your actual imports) ─────────────────────
const Logo = "https://placehold.co/40x40/000/fff?text=L";

const categoryData = [
  { name: "LED Lighting" },
  { name: "Signage Systems" },
  { name: "Retail Displays" },
  { name: "Smart Controls" },
  { name: "Outdoor Solutions" },
  { name: "Custom Projects" },
];

const brandData = [
  { name: "Philips" },
  { name: "Osram" },
  { name: "Cree" },
  { name: "Lutron" },
];

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

// ─── Social Icons ─────────────────────────────────────────────────────────────
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function ShopFooter() {
  // Replace with real useNavigate if inside a Router
  const navigate = (typeof window !== "undefined" ? useNavigate?.() : null) || ((path: string) => { window.location.href = path; });

  return (
    <div className="relative">
      {/* Ambient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-1/4 w-72 h-72 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
      />

      {/* ── Newsletter ─────────────────────────────────────────────────────── */}
      <div
        className="relative mb-10 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: "20px",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
          animation: "float 6s ease-in-out infinite",
        }}
      >
        {/* Shimmer bar */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)",
          }}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-7">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h3
              className="text-2xl font-bold tracking-tight text-gray-900 mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Stay updated 🚀
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              New arrivals, exclusive deals, and lighting insights — straight to your inbox.
            </p>
          </div>

          {/* Form */}
          <div className="flex w-full lg:w-auto items-center gap-2">
            <div className="relative flex-1 lg:w-72 group">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white/80 rounded-xl border border-gray-200/70 focus:outline-none transition-all duration-300 placeholder-gray-400"
                style={{
                  boxShadow: "0 0 0 0 transparent",
                  transition: "box-shadow 0.25s, border-color 0.25s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
                  e.currentTarget.style.borderColor = "rgba(229,231,235,0.7)";
                }}
              />
            </div>
            <button
              onClick={() => alert("Subscribed! 🎉")}
              className="relative overflow-hidden px-6 py-3 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                boxShadow: "0 2px 12px rgba(17,24,39,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(17,24,39,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(17,24,39,0.35)";
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer ────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* ── Brand ── */}
            <div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2.5 mb-5 group focus:outline-none"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm overflow-hidden transition-transform duration-200 group-hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #111827, #374151)" }}
                >
                  <img src={Logo} alt="LSI" className="w-9 h-9 object-cover" />
                </div>
                <span
                  className="text-lg font-bold text-gray-900 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  LSI Corp
                </span>
              </button>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Cutting-edge lighting, signage, and retail solutions engineered for modern businesses.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {[
                  { icon: <TwitterIcon />, label: "Twitter" },
                  { icon: <InstagramIcon />, label: "Instagram" },
                  { icon: <LinkedInIcon />, label: "LinkedIn" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    style={{ background: "rgba(0,0,0,0.04)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.09)";
                      e.currentTarget.style.color = "#111827";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Categories ── */}
            <FooterLinkColumn
              title="Categories"
              items={categoryData.slice(0, 6).map((c) => ({
                label: c.name,
                onClick: () => navigate(`/shop/${slugify(c.name)}`),
              }))}
            />

            {/* ── Brands ── */}
            <FooterLinkColumn
              title="Brands"
              items={brandData.map((b) => ({
                label: b.name,
                onClick: () => navigate(`/shop/${slugify(b.name)}`),
              }))}
            />

            {/* ── Quick Links ── */}
            <FooterLinkColumn
              title="Quick Links"
              items={[
                { label: "Home", onClick: () => navigate("/home") },
                { label: "Shop", onClick: () => navigate("/shop") },
                { label: "Profile", onClick: () => navigate("/profile") },
                { label: "Orders", onClick: () => navigate("/orders") },
                { label: "Settings", onClick: () => navigate("/settings") },
              ]}
            />
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-6"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent 100%)",
            }}
          />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              © {new Date().getFullYear()} LSI Corp. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms", "Contact"].map((link) => (
                <button
                  key={link}
                  className="relative text-xs text-gray-400 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus-visible:underline group"
                >
                  {link}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px bg-gray-800 w-0 group-hover:w-full transition-all duration-300 ease-out"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Float animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

// ─── Reusable link column ─────────────────────────────────────────────────────
function FooterLinkColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; onClick: () => void }[];
}) {
  return (
    <div>
      <h3
        className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5"
      >
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map(({ label, onClick }) => (
          <li key={label}>
            <button
              onClick={onClick}
              className="group relative text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus-visible:underline flex items-center gap-1.5"
            >
              <span
                className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 text-gray-300"
              >
                ›
              </span>
              <span className="relative">
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px bg-gray-900 w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}