# E-Commerce Website

A modern and responsive e-commerce web application built using React, TypeScript, and Vite. The project demonstrates a complete front-end shopping experience with product browsing, filtering, cart management, wishlist functionality, and responsive UI design.

The application uses a Mock API integrated with React Query for efficient data fetching, caching, loading states, and background updates.

---

# Project Overview

This project is a modern Single Page Application (SPA) that allows users to:

* Browse products from a Mock API
* Search and filter products
* View detailed product pages
* Add and remove products from the cart
* Manage wishlist items
* Experience a responsive UI across all devices

The project focuses on reusable components, scalable architecture, and smooth user experience.

---

# Features

## Product Listing

* Product search
* Category filtering
* Price range filtering
* Product sorting
* Pagination support

## Product Details

* Dynamic product detail pages
* Add to cart functionality
* Wishlist support

## Shopping Cart

* Add/remove products
* Quantity management
* Cart total calculation

## Wishlist

* Save products for later
* Move wishlist items to cart

## Authentication Protection

* Cart and wishlist actions are protected
* Authentication modal shown for unauthenticated users

## Notifications

* Toast notifications for user actions

## Responsive Design

* Mobile-first responsive layout
* Optimized for desktop, tablet, and mobile devices

---

# Mock API + React Query

This project uses a Mock API to simulate backend product and category data.

React Query (`@tanstack/react-query`) is used for:

* Fetching API data
* Caching responses
* Managing loading states
* Handling error states
* Background refetching
* Improving application performance

The API logic is managed inside:

```bash
src/services/productService.ts
```

---

# Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* React Query (`@tanstack/react-query`)
* React Hot Toast
* Lucide React Icons
* Context API
* Custom CSS / CSS Modules

---

# Project Structure

```bash
src/
│
├── components/     # Reusable UI components
├── pages/          # Application pages
├── routes/         # Routing configuration
├── services/       # Mock API service functions
├── store/          # Context providers
├── styles/         # CSS and styling files
├── utils/          # Utility/helper functions
```

---

# Application Architecture

## `src/App.tsx`

Wraps the application with:

* `QueryClientProvider`
* `AuthProvider`
* `CartProvider`
* `WishlistProvider`
* `Toaster`

---

## `src/routes/AppRoutes.tsx`

Handles all application routes:

* Home Page
* Product Listing Page
* Product Detail Page
* Cart Page
* Wishlist Page

---

## `src/services/productService.ts`

Responsible for fetching product and category data from the Mock API.

---

## Context Providers

### `CartContext.tsx`

Handles:

* Cart items
* Quantity updates
* Cart totals

### `WishlistContext.tsx`

Manages wishlist functionality and state.

### `AuthContext.tsx`

Handles authentication state for protected actions.

---

## Reusable Components

### `ProductCard.tsx`

Displays:

* Product image
* Product information
* Add to cart button
* Wishlist button

Used across product listing pages.

---

# Installation

## Install Dependencies

```bash
npm install
```

---

# Run Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal:

```bash
http://localhost:5173
```

---

# Build for Production

```bash
npm run build
```

---

# Preview Production Build

```bash
npm run preview
```

---

# Application Behavior

## Search & Filters

Users can:

* Search products
* Filter by category
* Filter by price
* Sort products dynamically

---

## Pagination

The product listing page supports pagination for improved user experience.

---

## Cart Functionality

Users can:

* Add products to cart
* Update quantities
* Remove products
* View total pricing

---

## Wishlist Functionality

Users can:

* Save products to wishlist
* Remove wishlist items
* Move products to cart

---

## Authentication Protection

Unauthenticated users are prompted with an authentication modal before performing protected actions.

---

## Toast Notifications

Toast messages provide feedback for actions like:

* Adding to cart
* Removing items
* Wishlist updates

---

# Responsive Design

The project is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile devices
* Small screen phones

The UI follows a mobile-first design approach using Tailwind CSS and custom responsive styling.

---

# Future Improvements

Potential future enhancements:

* Real backend integration
* Secure authentication system
* Checkout and payment gateway
* Order management
* Product reviews and ratings
* Cart persistence using local storage
* Better loading skeletons
* Improved error handling
* Admin dashboard

---

# Conclusion

This project demonstrates a scalable and modern e-commerce frontend architecture using React, TypeScript, React Query, and Context API. It focuses on reusable components, responsive UI, clean state manageme
