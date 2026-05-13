// HeroBanner.tsx

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "../../styles/HeroBanner.css";

 export const HeroBanner: React.FC = () => {
  return (
    <section className="hero">
      {/* Background Effects */}
      <div className="hero-overlay"></div>
      <div className="hero-blur hero-blur-1"></div>
      <div className="hero-blur hero-blur-2"></div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-tag">NEW FASHION COLLECTION 2026</span>

          <h1 className="hero-title">
            Elevate Your <span>Style</span>
          </h1>

          <p className="hero-description">
            Discover premium fashion pieces crafted for modern lifestyles.
            Explore luxury outfits, trendy collections, and timeless styles
            designed to make every moment exceptional.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-btn primary-btn">
              Explore Collection
              <ChevronRight size={20} />
            </Link>

            <button className="hero-btn secondary-btn">
              View Lookbook
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div>
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3>500+</h3>
              <p>Premium Products</p>
            </div>

            <div>
              <h3>4.9★</h3>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image-section">
          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&q=80"
              alt="Fashion Model"
              className="hero-image"
            />

            <div className="floating-card">
              <span>🔥 Trending Outfit</span>
              <h4>Summer Luxury Collection</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="bottom-fade"></div>
    </section>
  );
};
