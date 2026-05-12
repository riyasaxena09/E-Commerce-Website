import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Get stored credentials
      const storedCredentials = localStorage.getItem("credentials");
      const credentials = storedCredentials ? JSON.parse(storedCredentials) : {};

      // Check if user exists and password matches
      if (!credentials[email] || credentials[email].password !== password) {
        throw new Error("Invalid email or password");
      }

      // Create user object
      const userData = credentials[email];
      const newUser: User = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Validate inputs
      if (!username || !email || !password) {
        throw new Error("All fields are required");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Check if email already exists
      const storedCredentials = localStorage.getItem("credentials");
      const credentials = storedCredentials ? JSON.parse(storedCredentials) : {};

      if (credentials[email]) {
        throw new Error("Email already registered");
      }

      // Create new user
      const userId = Date.now().toString();
      credentials[email] = {
        id: userId,
        username,
        email,
        password,
      };

      // Store credentials
      localStorage.setItem("credentials", JSON.stringify(credentials));

      // Create user object
      const newUser: User = {
        id: userId,
        email,
        username,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Clear cart on logout
    localStorage.removeItem("ecommerce_cart");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
