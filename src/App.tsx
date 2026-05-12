
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppRoutes />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;


