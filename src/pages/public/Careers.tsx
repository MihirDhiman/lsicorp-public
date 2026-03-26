import { useCmsPage } from "../../context/CmsContext";

export default function Careers() {
  const { pageData, loading } = useCmsPage("careers");

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
        No Careers content found.
        <br />
        Please add content in CMS → Careers Page.
      </div>
    );
  }

  const hero = pageData.content?.hero_section || {};
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

        <div className="container mx-auto ml-40 h-full flex items-left justify-left relative z-10">
          <div className="text-left max-w-4xl">
            <div className="w-[50%] h-1 mb-6" style={{ backgroundColor: hero?.["top-bar-color"]  }} />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {hero?.headline}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              {hero?.["sub-headline"]}
            </p>

            {/* Hero Button */}
              {hero?.["button-text"] && (
                <button 
                  className="mt-6 px-6 py-3 text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: hero?.["button-bg"]  }}
                >
                  {hero["button-text"]}
                </button>
              )}

            <div 
              className="p-8 max-w-lg mt-10 shadow-lg"
              style={{ backgroundColor: hero?.["box_color"] }}
            >
              <p className="text-white leading-relaxed text-lg">
                {hero?.description}
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION - WE OFFER */}
{middle_section?.points && middle_section.points.length > 0 && (
  <section className="py-16 ml-20 bg-black">
    <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px]">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          {middle_section.headline || "We Offer"}:
        </h2>
      </div>

      {/* Bullet Points List */}
      <ul className="list-disc list-inside space-y-3 mb-10">
        {middle_section.points.map((point: any, i: number) => (
          <li key={i} className="text-white text-lg">
            {point.text}
          </li>
        ))}
      </ul>

      {/* Button */}
      {middle_section["button-text"] && (
        <button
          className="px-6 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: middle_section["button-bg"] || "#AB2328" }}
        >
          {middle_section["button-text"]}
        </button>
      )}
    </div>
  </section>
)}

    </div>
  );
}
