import { useState, useEffect } from "react";
import { fetchAllProducts, fetchCategories, type Product } from "../services/productService";
import { ProductGrid } from "../components/common/ProductGrid";
import { Filter, X } from "lucide-react";

export const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(100, 0),
          fetchCategories(),
        ]);
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort products
  let filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setSortBy("");
    setCurrentPage(1);
  };

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Shop Our Collection</h1>
          <p className="text-gray-600">
            Discover {filteredProducts.length} amazing products
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">Filters</h3>
                {(selectedCategory || sortBy || priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                      !selectedCategory
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors capitalize ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      setPriceRange([Number(e.target.value), priceRange[1]]);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], Number(e.target.value)]);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                  />
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>-</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6 p-4 bg-gray-50 rounded-lg">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="float-right"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Category */}
                <div className="mb-4 clear-both">
                  <h4 className="font-semibold mb-2">Category</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <h4 className="font-semibold mb-2">Sort</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            )}

            {/* Products */}
            <ProductGrid products={displayedProducts} isLoading={isLoading} columns={3} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo(0, 0);
                    }}
                    className={`px-4 py-2 rounded transition-colors ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "border border-gray-300 text-gray-700 hover:border-black"
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
