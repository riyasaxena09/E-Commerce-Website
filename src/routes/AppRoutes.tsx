
import { HomePage } from "../pages/HomePage";
import { ProductListingPage } from "../pages/ProductListingPage";
import { CartPage } from "../pages/CartPage";
import { WishlistPage } from "../pages/WishlistPage";
import { MainLayout } from "../layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/sale" element={<ProductListingPage />} />
          <Route path="/about" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
