import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCmsPage } from "../../context/CmsContext";

const BASE_URL = ((import.meta.env.VITE_API_URL_PROFILE_PIC as string) ?? "").replace(/\/$/, "");
  const resolveUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/${path}`;
  };

type MarketCard = { title: string; img: string; link: string };

const STATIC_NEWS = [
  {
    title: "LSI's V-LOCITY™️ Area Light Earns Distinction in 2025 IES Industry Progress Report",
    date: "October 26, 2025",
    slug: "v-locity-progress-report",
  },
  {
    title: "Rock and Roll Hall of Famer Headlines Exclusive LSI Concert Series in Chicago",
    date: "October 27, 2025",
    slug: "lsi-concert-series",
  },
  {
    title: "CLAYTON JOHNDRO MEMORIAL TOURNAMENT BREAKS RECORD",
    date: "October 8, 2025",
    slug: "clayton-johndro-record",
  },
];

export default function HomeStatic() {
  const { pageData, loading } = useCmsPage("Home");

  const hero   = pageData?.content?.hero_section;
  const mid    = pageData?.content?.mid_section;
  const bottom = pageData?.content?.bottom_section;
  const [marketsState, setMarketsState] = useState<MarketCard[]>([]);
  const [scrolling, setScrolling]       = useState(false);
  const containerRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hero?.vertical_market) return;
    setMarketsState(
      hero.vertical_market.map((m: any) => ({
        title: m.title ?? "",
        img:   resolveUrl(m.image ?? ""),
        link:  m.link  ?? "#",
      }))
    );
  }, [hero]);

  const scrollOne = useCallback(() => {
    if (scrolling) return;
    const container = containerRef.current;
    if (!container || container.children.length === 0) return;
    setScrolling(true);
    const firstCard = container.children[0] as HTMLElement;
    const cardWidth = firstCard.offsetWidth + 8;
    container.scrollTo({ left: cardWidth, behavior: "smooth" });
    setTimeout(() => {
      setMarketsState((prev) => [...prev.slice(1), prev[0]]);
      container.scrollTo({ left: 0, behavior: "auto" });
      setScrolling(false);
    }, 600);
  }, [scrolling]);

  const handleManual = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    if (dir === "left") {
      scrollOne();
    } else {
      setMarketsState((prev) =>
        prev.length <= 1 ? prev : [prev[prev.length - 1], ...prev.slice(0, -1)]
      );
      setTimeout(() => container.scrollTo({ left: 0, behavior: "smooth" }), 20);
    }
  };

  useEffect(() => {
    if (marketsState.length === 0) return;
    const interval = setInterval(scrollOne, 3000);
    return () => clearInterval(interval);
  }, [scrollOne, marketsState.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-100 bg-black">

      {/* ─── HERO SECTION ─── */}
      <section className="relative h-auto md:h-[700px] lg:h-[850px] w-full flex flex-col justify-between items-start text-left overflow-hidden">
        <div className="w-full max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-between items-start text-left">

          {/* Background video from API */}
          {hero?.bg_video && (
            <video
              autoPlay loop muted playsInline preload="auto"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
              <source src={resolveUrl(hero.bg_video)} type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none bg-gradient-to-b from-black/100 via-black/40 to-transparent z-20" />
          <div className="absolute bottom-0 left-0 w-full h-32 md:h-44 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

          {/* Hero Text from API */}
          <div className="relative ml-8 z-30 mt-40 mb-6 sm:mt-20 md:mt-24 lg:mt-52 text-white max-w-2xl px-2 sm:px-4 md:pl-6 lg:pl-12">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-6 leading-tight">
              {hero?.headline ?? ""}
            </h1>
            {hero?.sub_headline && (
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed whitespace-pre-line overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                } as React.CSSProperties}
              >
                {hero.sub_headline}
              </p>
            )}
          </div>

          {/* Brand Logos from API */}
          {Array.isArray(hero?.brand_logos) && hero.brand_logos.length > 0 && (
            <div className="hidden sm:flex relative z-30 w-full justify-center mt-60 mb-4">
              <div className="flex w-full flex-nowrap items-center gap-6 justify-center px-2">
                {hero.brand_logos.map((b: any, i: number) => (
                  <a key={i} href={b.link || "#"}>
                    {resolveUrl(b.image) ? (
                      <img
                        loading="lazy"
                        src={resolveUrl(b.image)}
                        alt={`brand-${i}`}
                        className="h-6 md:h-7 opacity-90 hover:opacity-100 transition"
                      />
                    ) : (
                      <span className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-widest transition">
                        {b.image}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Markets Carousel from API */}
          {marketsState.length > 0 && (
            <div className="relative z-30 mt-0 mb-6 w-full text-left px-2">
              <div className="w-full mx-auto">

                <div className="relative flex items-center justify-center md:justify-start">
                  {/* Left Button */}
                  <button
                    onClick={() => handleManual("left")}
                    className="absolute -left-2 sm:-left-6 md:-left-14 p-1 sm:p-2 rounded-full z-40 bg-transparent hover:scale-110"
                  >
                    <ChevronLeft className="text-white w-5 h-5 sm:w-6 sm:h-6 opacity-90 hover:opacity-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                  </button>

                  {/* Cards */}
                  <div
                    ref={containerRef}
                    className="flex overflow-hidden w-full max-w-full sm:px-2 gap-2 sm:gap-3"
                  >
                    {marketsState.map((m, i) => (
                      <div
                        key={i}
                        className="relative min-w-[100%] max-w-[100%] sm:min-w-[50%] sm:max-w-[50%] lg:min-w-[25%] lg:max-w-[25%] flex-shrink-0 overflow-hidden bg-black/20"
                      >
                        <div className="absolute top-0 left-0 w-full h-[2px] sm:h-[3px] bg-red-600 z-20" />
                        <a href={m.link} className="group block relative">
                          <img
                            src={m.img}
                            alt={m.title}
                            className="h-24 sm:h-28 md:h-32 w-full object-cover brightness-90 transition-all duration-300 group-hover:brightness-50"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
                          <div className="absolute bottom-1 sm:bottom-1.5 w-full text-center">
                            <p className="text-white font-medium text-[10px] sm:text-xs md:text-sm tracking-wide transition-colors duration-300 group-hover:text-[#ab2328]">
                              {m.title}
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Right Button */}
                  <button
                    onClick={() => handleManual("right")}
                    className="absolute -right-3 sm:-right-6 md:-right-14 sm:p-2 rounded-full z-40 bg-transparent hover:scale-110"
                  >
                    <ChevronRight className="text-white w-10 h-10 sm:w-6 sm:h-6 opacity-90 hover:opacity-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                  </button>
                </div>

                {/* See All button from API */}
                {hero?.button && (
                  <div className="text-center mt-4 sm:mt-5 md:mt-6">
                    <a href={hero.button.link || "#"}>
                      <button
                        style={{ backgroundColor: hero.button.bg_color || "#ab2328" }}
                        className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm text-white tracking-wide hover:opacity-90 transition"
                      >
                        {hero.button.text}
                      </button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      <div className="w-full flex justify-center bg-black">
        <div className="w-full max-w-[2560px]">

          {/* ─── MID / ESG SECTION from API ─── */}
          {mid && (
            <section
              className="relative mt-8 w-full h-[650px] md:h-[800px] lg:h-[1000px] overflow-hidden"
               style={{
                  backgroundImage: mid.bg_image
                    ? `url(${resolveUrl(mid.bg_image)})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
              <div className="absolute inset-0 flex items-center">
                {/* Main Content */}
                <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 max-w-md text-left z-20 ml-6 sm:ml-10 md:ml-16 lg:ml-24 xl:ml-32 px-4">
                  {mid.button && (
                    <a
                      href={mid.button.link || "#"}
                      style={{ backgroundColor: mid.button.bg_color || "#ab2328" }}
                      className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md uppercase text-xs sm:text-sm text-white inline-block hover:opacity-90 transition"
                    >
                      {mid.button.text}
                    </a>
                  )}

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-5 sm:mt-6">
                    {mid.title}
                  </h2>

                  <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg mt-4 sm:mt-5">
                    {mid.description}
                  </p>

                  {mid.read_more?.text && (
                    <a href={mid.read_more.link || "#"}>
                      <button
                        style={{ color: mid.read_more.text_color || "white" }}
                        className="uppercase text-xs sm:text-sm font-semibold hover:text-red-500 border-b border-gray-500 pb-1 transition-colors mt-4 sm:mt-5"
                      >
                        {mid.read_more.text}
                      </button>
                    </a>
                  )}
                </div>

                {/* Stock Info Box */}
                {mid.stock && (
                  <div
                    style={{ backgroundColor: mid.stock.bg_color || "#3A3A3A" }}
                    className="text-white px-5 py-4 w-[180px] sm:w-[260px] shadow-lg rounded-sm z-30 absolute bottom-16 left-1/2 -translate-x-1/2 sm:left-auto sm:right-12 sm:translate-x-0 sm:bottom-6 lg:bottom-24 lg:right-24"
                  >
                    <h4 className="text-[15px] font-semibold leading-tight mb-2">LSI Industries Stock</h4>
                    <div className="flex items-start gap-2 leading-none">
                      <span className="text-[40px] font-bold tracking-tight">$17</span>
                      <span className="text-sm font-semibold mt-1 leading-tight">
                        LYTS<br />
                        <span className="text-gray-300 text-xs">+0.42 (2.53%)</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-3">Nasdaq: LYTS — Delayed 15 min</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ─── LATEST NEWS (static — no CMS field yet) ─── */}
          <section className="bg-black text-white py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-32 xl:px-56 2xl:px-72">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-0">
              <h3 className="text-xl sm:text-3xl font-bold uppercase tracking-wide">Latest News</h3>
              <button className="text-xs sm:text-sm uppercase font-semibold text-white hover:text-red-500 border-b border-red-600 pb-1">
                See All LSI News
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {STATIC_NEWS.map((n, i) => (
                <div key={i}>
                  <div className="border-t border-red-600 pt-3 sm:pt-4">
                    <h5 className="text-xl sm:text-3xl font-semibold mb-2 leading-snug">{n.title}</h5>
                    <p className="text-2xs text-gray-400 mb-2 sm:mb-3">{n.date}</p>
                    <button className="uppercase text-2xs font-semibold hover:text-red-500 border-b border-gray-500 pb-0.5 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── ABOUT / BOTTOM SECTION from API ─── */}
          {bottom && (
            <section
              className="relative bg-cover bg-center bg-no-repeat py-16 sm:py-20 md:py-24 lg:py-28"
              style={{
                backgroundImage: bottom.bg_image
                  ? `url(${resolveUrl(bottom.bg_image)})`
                  : undefined,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 flex items-center justify-center md:justify-start">
                <div
                  style={{ backgroundColor: bottom.card?.bg_color || "#ab2328" }}
                  className="text-white w-full max-w-xl p-6 sm:p-8 md:p-10 shadow-xl"
                >
                  <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    {bottom.title}
                  </h3>
                  <p className="text-xs sm:text-xl leading-relaxed mb-4 sm:mb-5 md:mb-6">
                    {bottom.description}
                  </p>
                  {bottom.read_more_button?.text && (
                    <a
                      href="#"
                      className="uppercase text-xl font-semibold border-b border-white hover:text-red-400 hover:border-red-400 transition-colors inline-block"
                    >
                      {bottom.read_more_button.text}
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}