export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};

export const calculateDiscount = (original: number, discount: number): number => {
  return original * (1 - discount / 100);
};

export const calculateDiscountAmount = (
  original: number,
  discount: number
): number => {
  return original - calculateDiscount(original, discount);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "★".repeat(fullStars);
  if (hasHalfStar) stars += "✦";
  return stars;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const formatCategoryName = (category: string): string => {
  return category
    ?.split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

export const getDiscountBadgeText = (discount: number): string => {
  if (discount >= 50) return "MASSIVE SALE";
  if (discount >= 30) return "BIG SALE";
  if (discount >= 20) return "SALE";
  return "LIMITED";
};
