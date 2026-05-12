import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {fetchProductById} from "../services/productService";
import {useWishlist} from "../store/WishlistContext";
import {useAuth} from "../store/AuthContext";
import {useCart} from "../store/CartContext";
import '../styles/ProductDetailPage.css';
import { AuthModal } from "../components/auth/Authenticate";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        discount: product.discountPercentage,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!product) return;

    const wishlistItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      discount: product.discountPercentage,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-loading">
          <div className="loading-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-error">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button onClick={() => navigate("/products")} className="back-btn">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate("/")} className="breadcrumb-link">
            Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <button onClick={() => navigate("/products")} className="breadcrumb-link">
            Products
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image-container">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="main-image"
                onError={(e) => {
                  e.currentTarget.src = product.thumbnail;
                }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="thumbnail-gallery">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail-btn ${selectedImage === index ? "active" : ""}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="thumbnail-image"
                      onError={(e) => {
                        e.currentTarget.src = product.thumbnail;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.title}</h1>
              {product.brand && (
                <span className="product-brand">{product.brand}</span>
              )}
            </div>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < Math.floor(product.rating) ? "filled" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-value">({product.rating})</span>
            </div>

            <div className="product-price">
              <span className="current-price">${discountedPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="original-price">${product.price.toFixed(2)}</span>
                  <span className="discount-badge">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                </>
              )}
            </div>

            <div className="product-stock">
              <span className={`stock-status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-category">
              <span className="category-label">Category:</span>
              <span className="category-value">{product.category}</span>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={handleWishlistToggle}
                className='wishlist-button'
              >
                {isInWishlist(product.id) ? "♥" : "♡"} {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;