import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, calculateDiscount, formatRating } from "../../utils/formatters";
import { useCart } from "../../store/CartContext";
import { useWishlist } from "../../store/WishlistContext";
import { useAuth } from "../../store/AuthContext";
import type { Product } from "../../services/productService";
import { AuthModal } from "../auth/Authenticate";
import "../../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('.wishlist-btn, .card-action-btn')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      discount: product.discountPercentage,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        discount: product.discountPercentage,
      });
    }
  };

  return (
    <>
      <div className="card-container" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        {/* Image Container */}
        <div className="card-image-wrapper">
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`card-image ${isImageLoaded ? "loaded" : ""}`}
            onLoad={() => setIsImageLoaded(true)}
          />

          {!isImageLoaded && <div className="card-image-skeleton" />}

          {/* Badges */}
          <div className="card-badges">
            {product.discountPercentage > 0 && (
              <div className="badge-sale">{Math.round(product.discountPercentage)}% OFF</div>
            )}
            {product.stock < 5 && product.stock > 0 && (
              <div className="badge badge-stock">
                Only {product.stock} Left
              </div>
            )}
            {product.stock === 0 && (
              <div className="badge badge-out">Out of Stock</div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="wishlist-btn"
          >
            <Heart
              className={`wishlist-icon ${inWishlist ? "in-wishlist" : ""}`}
            />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`card-action-btn ${
              product.stock === 0 ? "unavailable" : "available"
            }`}
          >
            <ShoppingBag className="card-action-icon" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {/* Product Info */}
        <div className="card-info">
          <p className="card-category">{product.category}</p>

          <h3 className="card-title">{product.title}</h3>

          {/* Rating */}
          <div className="card-rating">
            <div className="card-stars">
              <Star className="star-icon" />
            </div>
            <span className="card-rating-value">
              {formatRating(product.rating)}
            </span>
          </div>

          {/* Price */}
          <div className="card-price-section">
            <span className="card-price">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="card-original-price">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
