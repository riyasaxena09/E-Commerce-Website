import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, type Product } from "../../services/productService";
import { ProductGrid } from "../common/ProductGrid";

export const TrendingProducts: React.FC = () => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trending-products"],
    queryFn: () => fetchAllProducts(8, 0),
  });

  const products: Product[] = data?.products || [];

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load trending products.
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slideUp">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-3">
            Best Picks
          </p>

          <h2 className="section-title">Trending This Week</h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what's hot right now. Our most popular items handpicked
            for style and quality.
          </p>
        </div>

        <ProductGrid
          products={products}
          isLoading={isLoading}
          columns={4}
        />
      </div>
    </section>
  );
};
