import React, { createContext, useContext, useState, useEffect } from "react";

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

const WISHLIST_STORAGE_KEY = "ecommerce_wishlist";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Persist wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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
