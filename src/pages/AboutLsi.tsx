import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AboutLsi() {
  const [heroContent] = useState({
    heading: "About LSI",
    subHeadline: "Trusted Lighting Solutions Since 1976",
    description: "LSI is a vertically integrated commercial indoor and outdoor lighting and display solutions company. A history of innovation has helped Cincinnati-based LSI grow across vertical markets with its range of lighting and display solutions.",
    topBarColor: "#ab2328",
    descriptionTextColor: "#ffffff",
    descriptionBgColor: "rgba(171, 35, 40, 0.8)",
    bgImage: "",
    bgVideo: "",
    bgVideoPoster: ""
  });

  const [description] = useState({
    title: "About LSI",
    content: "LSI Industries is a leading manufacturer of high-quality lighting, display, and graphics solutions. Founded in 1976, we have built a reputation for innovation, quality, and customer service excellence. Our comprehensive product portfolio includes LED lighting systems, digital signage, display fixtures, and custom graphics solutions that serve a wide range of industries including retail, commercial, industrial, and institutional markets.",
    features: [
      "45+ years of industry experience",
      "ISO 9001 certified manufacturing",
      "Innovative LED technology",
      "Custom design capabilities",
      "Nationwide service network"
    ]
  });

  useEffect(() => {
    // Fetch about content from API
    // For now using default content
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div 
        className="h-2 w-full"
        style={{ backgroundColor: heroContent.topBarColor }}
      />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        {heroContent.bgVideo ? (
          <video 
            poster={heroContent.bgVideoPoster}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={heroContent.bgVideo} type="video/mp4" />
          </video>
        ) : heroContent.bgImage ? (
          <img 
            src={heroContent.bgImage} 
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
        )}
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {heroContent.heading}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-4xl mx-auto">
            {heroContent.subHeadline}
          </p>
          <div 
            className="inline-block p-6 rounded-lg max-w-4xl"
            style={{ 
              backgroundColor: heroContent.descriptionBgColor,
              color: heroContent.descriptionTextColor 
            }}
          >
            <p className="text-lg leading-relaxed">
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* About Description */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                {description.title}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description.content}
              </p>
              
              <div className="space-y-4">
                {description.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-800 rounded-full flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="About LSI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subpages Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-12 p-6 rounded-lg"
            style={{ backgroundColor: "#ab2328", color: "#ffffff" }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Subpages
            </h2>
            <p className="text-lg opacity-90">
              Explore more about LSI's leadership, history, and sustainability initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">LSI Leadership</h3>
              <p className="text-gray-600 mb-6">
                Our leadership team steers our company towards groundbreaking advancements and strategic acquisitions, ensuring we remain at the forefront of the industries we serve.
              </p>
              <Link
                to="/about-lsi/leadership"
                className="inline-flex items-center text-red-800 font-semibold hover:text-red-900"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our History</h3>
              <p className="text-gray-600 mb-6">
                At LSI, we are proud of our heritage, as well as our solid track record of adapting to rapid technological and regulatory changes.
              </p>
              <Link
                to="/about-lsi/history"
                className="inline-flex items-center text-red-800 font-semibold hover:text-red-900"
              >
                Read More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sustainability</h3>
              <p className="text-gray-600 mb-6">
                LSI fundamentally believes in providing industry leading products and customer service without sacrificing our commitment to operate responsibly across all aspects of our business.
              </p>
              <Link
                to="/about-lsi/sustainability"
                className="inline-flex items-center text-red-800 font-semibold hover:text-red-900"
              >
                Learn About
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Partner With LSI Industries
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of satisfied customers who trust LSI for their lighting and display solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-red-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
