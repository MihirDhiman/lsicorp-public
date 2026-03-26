import { useCmsPage } from "../../context/CmsContext";

export default function Brands() {
  const { pageData, loading } = useCmsPage("brands");

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
        No Brands content found.
        <br />
        Please add content in CMS → Brands Page.
      </div>
    );
  }

  const hero = pageData.content?.hero_section || {};
  const brands = pageData.content?.brands || [];
  const middle_section = pageData.content?.middle_section;

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

        <div className="container mx-auto h-full flex items-left justify-left relative z-10">
          <div className="text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              <div 
                className="w-[98%] h-1 mb-6" 
                style={{ backgroundColor: hero?.["top-bar-color"] }}
              />
              {hero?.headline }
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              {hero?.["sub-headline"]}
            </p>

            <div 
              className="p-8 max-w-3xl shadow-lg max-w-[550px]"
              style={{ backgroundColor: hero?.["box_color"] }}
            >
              <p className="text-white leading-relaxed text-lg ">
                {hero?.description }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      {middle_section?.description && (
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white leading-relaxed text-lg text-left">
              {middle_section.description}
            </p>
          </div>
        </section>
      )}

      {/* BRANDS SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {brands.map((brand: any, i: number) => (
              <div key={i} className="relative bg-black p-6 border-t-3 max-w-[400px] group hover:border-red-600 transition-colors" style={{ borderTopColor: hero?.["top-bar-color"] }}>
                {/* Brand Logo/Image */}
                <div 
                  className="w-72 h-1 mb-2" 
                  style={{ backgroundColor: hero?.["top-bar-color"]}}
                />
                {brand?.brand_image && (
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={`${import.meta.env.VITE_API_URL_PROFILE_PIC}${brand.brand_image}`}
                      alt={brand.name || `Brand ${i + 1}`}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                )}

                {/* Brand Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed text-left ">
                  {brand.description}
                </p>

                {/* Read More Button */}
                {brand["button-link"] ? (
                  <a 
                    href={brand["button-link"]}
                    className="block w-full text-left text-white underline underline-offset-8 text-xs font-bold tracking-widest hover:text-red-500 transition-colors"
                  >
                    {brand["button-text"]}
                  </a>
                ) : (
                  <button 
                    className="w-full text-left text-white underline underline-offset-8 text-xs font-bold tracking-widest hover:text-red-500 transition-colors"
                  >
                    {brand["button-text"]}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND HIGHLIGHT SECTION */}
      {pageData.content?.highlight_section && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-center md:text-4xl font-bold text-white mb-4">
                {pageData.content.highlight_section.title }
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                {pageData.content.highlight_section.description}
              </p>
            </div>

            {/* Brand Stats */}
            {pageData.content.highlight_section.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {pageData.content.highlight_section.stats.map((stat: any, i: number) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
