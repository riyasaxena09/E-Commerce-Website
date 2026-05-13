/* eslint-disable */
// @ts-nocheck

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchProductsByCategory,
  type Product,
} from "../../services/productService";

import { ProductGrid } from "../common/ProductGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedCollections: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log("Selected Category:", scrollPosition);
  // Fetch Categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories},
  );

  // Set default category after categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  // Fetch Products by Category
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["category-products", selectedCategory],
    queryFn: () =>
      fetchProductsByCategory(selectedCategory as string, 8, 0),
    enabled: !!selectedCategory,
  });

  const products: Product[] = productsData?.products || [];

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

  if (categoriesError || productsError) {
    return (
      <section className="py-16 text-center text-red-500">
        Failed to load featured collections.
      </section>
    );
  }

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
            {!categoriesLoading &&
              categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                    selectedCategory === category.name
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
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
        <ProductGrid
          products={products}
          isLoading={productsLoading}
          columns={4}
        />
      </div>
    </section>
  );
};