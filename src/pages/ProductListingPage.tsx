import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
  type Product,
} from "../services/productService";

import { ProductGrid } from "../components/common/ProductGrid";

import {
  Filter,
  X,
} from "lucide-react";

interface Category {
  slug: string;
  name: string;
}

export const ProductListingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itemsPerPage = 12;

  // Categories Query
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Products Query
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory, searchQuery],
    queryFn: async () => {
      // Search
      if (searchQuery.trim()) {
        return fetchAllProducts(100, 0, searchQuery);
      }

      // Category
      if (selectedCategory) {
        return fetchProductsByCategory(selectedCategory, 100, 0);
      }

      // Default
      return fetchAllProducts(100, 0);
    },
  });

  const products: Product[] = productsData?.products || [];

  // Frontend Price + Sort Filtering
  const filteredProducts = useMemo(() => {
    return [...products]
      .filter(
        (p) =>
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
      )
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;

        return 0;
      });
  }, [products, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setSortBy("");
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load products.
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Shop Our Collection
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            Discover {filteredProducts.length} amazing products
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 md:mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 md:px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() =>
              setShowMobileFilters(true)
            }
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40">
            <div className="absolute right-0 top-0 h-full w-[85%] sm:w-[70%] bg-white p-6 overflow-y-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  Filters
                </h3>

                <button
                  onClick={() =>
                    setShowMobileFilters(false)
                  }
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">
                  Category
                </h4>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                      setShowMobileFilters(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedCategory
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => {
                        setSelectedCategory(
                          category.slug
                        );

                        setCurrentPage(1);

                        setShowMobileFilters(false);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory ===
                        category.slug
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">
                  Price Range
                </h4>

                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-full"
                  />

                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full"
                  />

                  <div className="text-sm text-gray-600">
                    ${priceRange[0]} - $
                    {priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">
                  Sort By
                </h4>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full px-3 py-3 border border-gray-300 rounded"
                >
                  <option value="">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={handleResetFilters}
                className="w-full py-3 bg-black text-white rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">
                  Filters
                </h3>

                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Category
                </h4>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !selectedCategory
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => {
                        setSelectedCategory(
                          category.slug
                        );

                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory ===
                        category.slug
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Price Range
                </h4>

                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-full"
                  />

                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full"
                  />

                  <div className="text-sm text-gray-600">
                    ${priceRange[0]} - $
                    {priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Sort By
                </h4>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <ProductGrid
              products={displayedProducts}
              isLoading={isLoading}
              columns={3}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mt-10 md:mt-12">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className={`px-4 py-2 rounded transition ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "border border-gray-300 hover:border-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};