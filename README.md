# E-Commerce Website

This repository contains a React + TypeScript e-commerce web application built with Vite. It is a modern storefront that demonstrates a product listing experience with search, filters, cart, wishlist, product details, and responsive UI.

## Project Overview

The app is a front-end e-commerce website that lets users browse products, apply search and filters, view product detail pages, add items to the cart, and manage a wishlist.

Key features:
- Product catalog with search, category filtering, price range filtering, sort, and pagination
- Product detail page with add-to-cart and wishlist actions
- Shopping cart state managed through React Context
- Wishlist state managed through React Context
- Authentication gating for cart/wishlist actions
- Toast notifications for user feedback
- Responsive mobile-first layout

## How It Works

The app is structured around React components, context providers, and API services:

- `src/App.tsx` wraps the app with providers and routing, including `QueryClientProvider`, `AuthProvider`, `CartProvider`, `WishlistProvider`, and `Toaster`.
- `src/routes/AppRoutes.tsx` defines the main routes for home, product listing, product details, cart, and wishlist pages.
- `src/services/productService.ts` fetches product and category data, primarily used by product listing and detail pages.
- `src/store/CartContext.tsx` manages cart items, quantities, and total state across the app.
- `src/store/WishlistContext.tsx` manages wishlist items and state.
- `src/store/AuthContext.tsx` manages basic authentication status for protected actions.
- `src/components/common/ProductCard.tsx` renders product cards used in listings and includes add-to-cart / add-to-wishlist actions.
- Pages like `src/pages/ProductListingPage.tsx`, `src/pages/ProductDetailPage.tsx`, `src/pages/CartPage.tsx`, and `src/pages/WishlistPage.tsx` render full page views.

The app uses React Query to load, cache, and manage product and category API data. React Query handles data fetching, background updates, loading states, and error states for product lists and detail pages, so the UI can stay responsive and up to date.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Query (`@tanstack/react-query`)
- React Router DOM
- React Hot Toast (`react-hot-toast`)
- Lucide React icons
- Context API for cart, wishlist, and auth state
- CSS modules / page-specific CSS

## Folder Structure

- `src/`
  - `components/` - reusable UI components like `ProductCard`, `ProductGrid`, `Header`, `Footer`, and auth modal
  - `pages/` - page views such as `HomePage`, `ProductListingPage`, `ProductDetailPage`, `CartPage`, `WishlistPage`
  - `routes/` - application routing setup
  - `services/` - API service functions for fetching product and category data
  - `store/` - React Context providers for authentication, cart, and wishlist
  - `styles/` - CSS files for pages and major components
  - `utils/` - utility functions such as price formatting and discount calculations

## Usage

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically `http://localhost:5173` or `http://localhost:5174`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Application Behavior

- **Search and filters:** Users can type a search query, select a category, adjust price range sliders, and sort products.
- **Pagination:** Product listing pages support pagination with page buttons.
- **Cart actions:** Users can add products to the cart, and the cart page displays the selected items and totals.
- **Wishlist actions:** Users can save items to a wishlist and move wishlist items to the cart.
- **Authentication gating:** Cart and wishlist actions require authentication state; if the user is not authenticated, an auth modal is shown.
- **Toast notifications:** Feedback messages appear when items are added to cart or moved from wishlist.

## Notes

- The current setup uses a mock or API-backed product service, depending on the service implementation in `src/services/productService.ts`.
- The UI is built with Tailwind utility classes and page-specific CSS.
- The project is designed as a client-side SPA using React Router.

## Recommended Improvements

To extend this project further, consider adding:
- real backend integration for user accounts and order placement
- cart persistence with local storage
- a real authentication flow
- improved error handling and loading states
- product review and rating features
