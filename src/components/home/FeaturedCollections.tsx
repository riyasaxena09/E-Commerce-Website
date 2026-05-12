import { useState, useEffect } from "react";
import { fetchCategories, fetchProductsByCategory, type Product } from "../../services/productService";
import { ProductGrid } from "../common/ProductGrid";
// import { formatCategoryName } from "../../utils/formatters";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedCollections: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("Selected Category:", scrollPosition);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.slice(0, 6)); // Show first 6 categories
        setSelectedCategory(data[0]);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const loadCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductsByCategory(selectedCategory, 8, 0);
        setProducts(data.products);
      } catch (error) {
        console.error("Error loading category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryProducts();
  }, [selectedCategory]);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("category-scroll");
    if (container) {
      const scrollAmount = 200;
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
        setScrollPosition(container.scrollLeft - scrollAmount);
      } else {
        container.scrollLeft += scrollAmount;
        setScrollPosition(container.scrollLeft + scrollAmount);
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slideUp">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-3">
            Collections
          </p>
          <h2 className="section-title">Featured Collections</h2>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-12">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            id="category-scroll"
            className="flex gap-3 overflow-x-auto pb-4 scroll-smooth px-10"
            style={{ scrollBehavior: "smooth" }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {/* {formatCategoryName(category)} */}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={isLoading} columns={4} />
      </div>
    </section>
  );
};
