import { Link } from "react-router-dom";
import { useCmsPage } from "../../context/CmsContext";

export default function AboutLsi() {
  const { pageData, loading } = useCmsPage("about lsi");

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
        No About Page content found.
        <br />
        Please add content in CMS → About Page.
      </div>
    );
  }

  const hero = pageData.content?.hero_section || {};
  const mid_section = pageData.content?.mid_section;
  const cards = pageData.content?.bottom_section || [];

  return (
    <div className="min-h-screen bg-black">

      {/* HERO */}
      <section className="relative min-h-[700px] flex flex-col items-start pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${hero?.bg_image ? `${import.meta.env.VITE_API_URL_PROFILE_PIC}${hero.bg_image}` : ""})`,
          }}
        />

        {/* PARTIAL VINTAGE TOP  */}
        <div
          className="absolute top-0 left-0 right-0 h-[15%] pointer-events-none
                    bg-gradient-to-b from-black/100 via-black/20 to-transparent z-20"
        />

        <div className="container mx-auto h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <div className="w-72 h-1 bg-red-800 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white mb-20">
              {hero?.headline}
            </h1>

            <div className="bg-[#AB2328] mt-40 p-8 max-w-md shadow-lg">
              <p className="text-white leading-relaxed">
                {hero?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {(() => {
        const text = mid_section?.description || '';
        // Split at specific sentence patterns to create 4 paragraphs
        const sentences = text.split('. ');
        const paragraphs = [];
        
        // Create 4 paragraphs from the sentences
        if (sentences.length > 0) {
          paragraphs.push(sentences.slice(0, 2).join('. ') + '.');
        }
        if (sentences.length > 2) {
          paragraphs.push(sentences.slice(2, 4).join('. ') + '.');
        }
        if (sentences.length > 4) {
          paragraphs.push(sentences.slice(4, 6).join('. ') + '.');
        }
        if (sentences.length > 6) {
          paragraphs.push(sentences.slice(6).join('. '));
        }
        
        return paragraphs.map((paragraph: string, i: number) => (
          <p key={i} className="text-white leading-relaxed text-lg mb-6">
            {paragraph}
          </p>
        ));
      })()}
        </div>
      </section>

      {/* CONTENT CARDS */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card: any, i: number) => (
              <div key={i} className="relative bg-black p-4 border-t-3 border-[#AB2328]">
                <Link
                  to={card["button-link"] || "#"}
                  className="block text-lg font-bold mb-2 text-white tracking-wide hover:text-[#AB2328] transition-colors"
                >
                  <div className="w-full h-1 bg-red-800 mb-6" />
                  {card.title}
                </Link>
                <p className="text-gray-400 mb-4 min-h-[60px]">
                  {card.description}
                </p>

                <Link
                  to={card["button-link"] || "#"}
                  className="text-white underline underline-offset-8 text-xs font-bold tracking-widest flex items-center gap-1 group hover:text-[#AB2328] transition-colors"
                >
                  {card["button-text"] }
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
