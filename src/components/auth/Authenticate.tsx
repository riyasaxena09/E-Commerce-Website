import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import "./authenticate.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }
        await login(email, password);
      } else {
        // Signup
        if (!username || !email || !password) {
          throw new Error("Please fill in all fields");
        }
        await signup(username, email, password);
      }

      // Reset form and close modal
      setEmail("");
      setPassword("");
      setUsername("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="modal-overlay">
      {/* Modal */}
      <div className="modal">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* Heading */}
        <h2 className="modal-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="modal-subtitle">
          {isLogin
            ? "Login to continue shopping"
            : "Sign up to join our community"}
        </p>

        {/* Error Message */}
        {error && <div className="modal-error">{error}</div>}

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Username - Only for Signup */}
          {!isLogin && (
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="modal-button"
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle to signup/login */}
        <p className="modal-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="modal-toggle-link"
            onClick={handleToggleMode}
            type="button"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        {/* Footer */}
        <p className="modal-footer">
          By continuing, you agree to our Terms &
          Conditions.
        </p>
      </div>
    </div>
  );
};