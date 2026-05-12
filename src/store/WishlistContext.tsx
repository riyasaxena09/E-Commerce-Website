import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  discount?: number;
}

export interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const GUEST_WISHLIST_KEY = "ecommerce_wishlist_guest";
const getWishlistStorageKey = (user: { id: string } | null) =>
  user ? `ecommerce_wishlist_${user.id}` : GUEST_WISHLIST_KEY;

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const stored = localStorage.getItem(getWishlistStorageKey(user));
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const storageKey = getWishlistStorageKey(user);
    if (user) {
      const stored = localStorage.getItem(storageKey);
      setItems(stored ? JSON.parse(stored) : []);
    } else {
      setItems([]);
    }
  }, [user]);

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(getWishlistStorageKey(user), JSON.stringify(items));
  }, [items, user]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      if (exists) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const isInWishlist = (id: number) => {
    return items.some((i) => i.id === id);
  };

  const getItemCount = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getItemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
