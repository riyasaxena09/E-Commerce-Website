import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slideUp">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Style
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Discover our curated collection of premium fashion pieces designed for the
              modern individual. From casual elegance to sophisticated formal wear, find
              your perfect look.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="btn-primary bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-2"
              >
                Explore Collection
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-black">
                View Sale
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="hidden md:block animate-fadeIn">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-lg blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80"
                alt="Fashion Model"
                className="relative w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
};
