import { useCmsPage } from "../../context/CmsContext";

export default function VerticalMarkets() {
  const { pageData, loading } = useCmsPage("vertical-markets");

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-black text-white p-20">
        No Vertical Markets content found.
        <br />
        Please add content in CMS → Vertical Markets Page.
      </div>
    );
  }

  const hero = pageData.content?.hero_section || {};
  const markets = pageData.content?.middle_section || [];

  return (
    <div className="min-h-screen bg-black">

      {/* HERO */}
      <section className="relative min-h-[700px] flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${hero?.bg_image ? `${import.meta.env.VITE_API_URL_PROFILE_PIC}${hero.bg_image}` : ""})`,
          }}
        />

        {/* PARTIAL VINTAGE TOP */}
        <div
          className="absolute top-0 left-0 right-0 h-[25%] pointer-events-none
                    bg-gradient-to-b from-black/100 via-black/20 to-transparent z-20"
        />

        <div className="container mx-auto h-full ml-40 flex items-left justify-left relative z-10 ">
          <div className="text-left max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-20 text-white">
              <div 
                className="w-[80%] h-1 mb-6" 
                style={{ backgroundColor: hero?.["top-bar-color"] }}
              />
              {hero?.headline }
            </h1>

            <div 
              className="p-8 max-w-xl shadow-lg"
              style={{ backgroundColor: hero?.["box_color"] }}
            >
              <p className="text-white leading-relaxed text-lg">
                {hero?.description }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETS SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-18 lg:px-38 max-w-[1920px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {markets.map((market: any, i: number) => (
              <div key={i} className="relative bg-black p-4 border-t-3 max-w-[700vh]" style={{ borderTopColor: market?.["top-bar-color"] }}>
                <div 
                  className="w-full h-1" 
                  style={{ backgroundColor: market?.["top-bar-color"] }}
                />
                {market?.["title-image"] && (
                  <img 
                    src={`${import.meta.env.VITE_API_URL_PROFILE_PIC}${market["title-image"]}`}
                    alt={market.title}
                    className="w-full h-28 object-cover mb-4"
                  />
                )}
                <h3 className="text-lg font-bold mb-2 text-white tracking-wide">
                  {market.title}
                </h3>
                <p className="text-gray-400 mb-4 min-h-[60px] leading-relaxed">
                  {market.description}
                </p>
                {market["button-link"] ? (
                  <a 
                    href={market["button-link"]}
                    className="text-white underline underline-offset-8 text-xs font-bold tracking-widest flex items-center gap-1 group hover:text-[#AB2328] transition-colors"
                  >
                    {market["button-text"] }
                  </a>
                ) : (
                  <button 
                    className="text-white underline underline-offset-8 text-xs font-bold tracking-widest flex items-center gap-1 group hover:text-[#AB2328] transition-colors"
                  >
                    {market["button-text"] }
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
