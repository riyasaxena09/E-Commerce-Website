import type { Product } from "../../services/productService";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: number;
}

const ProductSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-64 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  columns = 4,
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const colClass = gridCols[columns as keyof typeof gridCols] || "grid-cols-4";

  if (isLoading) {
    return (
      <div className={`grid ${colClass} md:grid-cols-3 sm:grid-cols-2 gap-6`}>
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} md:grid-cols-3 sm:grid-cols-2 gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
