
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { AuthProvider } from './store/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;


