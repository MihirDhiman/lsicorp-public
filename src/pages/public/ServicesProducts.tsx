import { useCmsPage } from "../../context/CmsContext";

export default function ServicesProducts() {
  const { pageData, loading } = useCmsPage("services-products");

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
        No Services & Products content found.
        <br />
        Please add content in CMS → Services & Products Page.
      </div>
    );
  }

  const hero = pageData.content?.hero_section || {};
  const mid_section = pageData.content?.mid_section;
  const bottom_section = pageData.content?.bottom_section || [];
  
  // Extract services and products from bottom_section
  const services = bottom_section[0]?.services || [];
  const products = bottom_section[1]?.products || [];

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

        <div className="container mx-auto  h-full flex items-center justify-left relative z-10">
          <div className="text-left max-w-xl ml-10">
            <div className="w-78 h-1 bg-red-800 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {hero?.headline || "Services & Products"}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
              {hero?.sub_headline || "Empowering Your Vision with Our Diverse Range of Products and Services"}
            </p>

            <div className="bg-[#AB2328] p-8 max-w-3xl shadow-lg">
              <p className="text-white leading-relaxed text-lg">
                {hero?.description || "Navigating the expanse of LSI Industries' offerings, our comprehensive suite of products and services reflects our commitment to innovation, quality, and customer satisfaction."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MID SECTION */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white leading-relaxed text-lg">
            {mid_section?.description}
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px] ">
          <div className="mb-12">
            <h2 className="text-3xl text-center md:text-4xl font-bold text-white">Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {services.map((service: any, i: number) => (
              <div key={i} className="relative bg-black p-6 border-t-3 border-[#AB2328] max-w-[400px]">
                <h3 className="text-xl font-bold mb-4 text-white tracking-wide">
                  <div className="w-full h-1 bg-red-800 mb-6" />
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button className="text-white underline underline-offset-8 text-xs font-bold tracking-widest flex items-center gap-1 group hover:text-[#AB2328] transition-colors">
                  {service["button-text"] || "READ MORE"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 sm:px-20 lg:px-40 max-w-[1920px]">
          <div className="mb-12">
            <h2 className="text-3xl text-center md:text-4xl font-bold text-white">Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: any, i: number) => (
              <div key={i} className="relative bg-black p-4 border-t-3 border-[#AB2328] max-w-[400px]">
                <h3 className="text-lg font-bold mb-2 text-white tracking-wide">
                  <div className="w-full h-1 bg-red-800 mb-6 " />
                  {product.title}
                </h3>
                <p className="text-gray-400 mb-4 min-h-[60px] leading-relaxed">
                  {product.description}
                </p>
                <button className="text-white underline underline-offset-8 text-xs font-bold tracking-widest flex items-center gap-1 group hover:text-[#AB2328] transition-colors">
                  {product["button-text"] || "READ MORE"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
