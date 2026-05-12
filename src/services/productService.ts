export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface PaginatedResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_BASE_URL = "https://dummyjson.com";

export const fetchAllProducts = async (
  limit: number = 30,
  skip: number = 0,
  search?: string
): Promise<PaginatedResponse> => {
  try {
    let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (search) {
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: string,
  limit: number = 30,
  skip: number = 0
): Promise<PaginatedResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products from category ${category}:`, error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
