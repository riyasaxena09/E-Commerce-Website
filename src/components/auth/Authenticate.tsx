import "./authenticate.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({
  isOpen,
  onClose,
}: AuthModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      {/* Modal */}
      <div className="modal">

        {/* Close Button */}
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="modal-title">
          Welcome Back
        </h2>

        <p className="modal-subtitle">
          Login to continue shopping
        </p>

        {/* Form */}
        <form className="modal-form">

          {/* Username */}
          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="modal-button"
          >
            Continue
          </button>

        </form>

        {/* Footer */}
        <p className="modal-footer">
          By continuing, you agree to our Terms &
          Conditions.
        </p>

      </div>
    </div>
  );
};