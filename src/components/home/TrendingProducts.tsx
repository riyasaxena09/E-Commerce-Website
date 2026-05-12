import { useState, useEffect } from "react";
import { fetchAllProducts, type Product } from "../../services/productService";
import { ProductGrid } from "../common/ProductGrid";

export const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts(8, 0);
        setProducts(data.products);
      } catch (error) {
        console.error("Error loading trending products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slideUp">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-3">
            Best Picks
          </p>
          <h2 className="section-title">Trending This Week</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what's hot right now. Our most popular items handpicked for style
            and quality.
          </p>
        </div>

        <ProductGrid products={products} isLoading={isLoading} columns={4} />
      </div>
    </section>
  );
};
