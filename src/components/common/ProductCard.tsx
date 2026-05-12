import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, calculateDiscount, formatRating } from "../../utils/formatters";
import { useCart } from "../../store/CartContext";
import { useWishlist } from "../../store/WishlistContext";
import type { Product } from "../../services/productService";
import { AuthModal } from "../auth/Authenticate";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const discountedPrice = calculateDiscount(product.price, product.discountPercentage);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAuthModalOpen(true);
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      discount: product.discountPercentage,
    });
  };

  const handleWishlistToggle = () => {
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
    <div className="bg-white rounded-lg overflow-hidden card-hover">
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden group">
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 shimmer" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.discountPercentage > 0 && (
            <div className="badge-sale">{Math.round(product.discountPercentage)}% OFF</div>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <div className="badge bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Only {product.stock} Left
            </div>
          )}
          {product.stock === 0 && (
            <div className="badge bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Overlay Action */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`absolute bottom-0 left-0 right-0 py-3 font-semibold transition-all transform translate-y-full group-hover:translate-y-0 flex items-center justify-center gap-2 ${
            product.stock === 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {product.category}
        </p>

        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 min-h-14">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {formatRating(product.rating)}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            {formatPrice(discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
