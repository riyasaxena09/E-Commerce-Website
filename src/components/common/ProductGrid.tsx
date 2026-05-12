import type { Product } from "../../services/productService";
import { ProductCard } from "./ProductCard";
import "../../styles/ProductGrid.css";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: number;
}

const ProductSkeleton: React.FC = () => (
  <div className="skeleton-container">
    <div className="skeleton-image" />
    <div className="skeleton-content">
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
    </div>
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid-container">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state-container">
        <p className="empty-state-message">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
