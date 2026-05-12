import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingBag, Search, LogOut } from "lucide-react";
import { useCart } from "../../store/CartContext";
import { useWishlist } from "../../store/WishlistContext";
import { useAuth } from "../../store/AuthContext";
import { AuthModal } from "../auth/Authenticate";
import "../../styles/Header.css";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { getItemCount: getCartCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo-link">
              <div className="logo-box">E</div>
              <span className="logo-text">LuxeStyle</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/products" className="nav-link">
                Shop
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="header-actions">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="action-btn"
                aria-label="Search"
              >
                <Search className="action-icon" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="action-link" aria-label="Wishlist">
                <Heart className="action-icon" />
                {wishlistCount > 0 && (
                  <span className="badge-counter">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="action-link" aria-label="Shopping Cart">
                <ShoppingBag className="action-icon" />
                {cartCount > 0 && (
                  <span className="badge-counter cart-badge">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="auth-user">
                  <span className="user-name">{user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                    aria-label="Logout"
                  >
                    <LogOut className="action-icon" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="login-btn"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-toggle"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="mobile-menu-icon" />
                ) : (
                  <Menu className="mobile-menu-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="search-bar-wrapper open">
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
              />
            </div>
          )}

          {/* Mobile Navigation */}
          <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
            <nav className="mobile-menu-content">
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {/* Mobile Auth Section */}
              <div className="mobile-auth-section">
                {isAuthenticated ? (
                  <>
                    <div className="mobile-user-info">
                      Welcome, {user?.username}!
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mobile-logout-btn"
                    >
                      <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="mobile-login-btn"
                  >
                    Login / Sign Up
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
