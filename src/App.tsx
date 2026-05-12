
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { AppRoutes } from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <AppRoutes />
      </WishlistProvider>
    </CartProvider>
    </QueryClientProvider>
  );
}

export default App;


