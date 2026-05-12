import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, Search } from "lucide-react";
import { useCart } from "../../store/CartContext";
import { useWishlist } from "../../store/WishlistContext";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getItemCount: getCartCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center text-white font-bold text-lg md:text-xl">
                E
              </div>
              <span className="hidden sm:inline text-lg md:text-xl font-bold text-black">
                LuxeStyle
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/sale"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Sale
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/sale"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sale
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
