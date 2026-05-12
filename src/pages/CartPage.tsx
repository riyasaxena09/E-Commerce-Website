import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../utils/formatters";

export const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const total = getTotal();
  const subtotal = total;
  const discount = (subtotal * couponDiscount) / 100;
  const finalTotal = subtotal - discount;

  const handleApplyCoupon = () => {
    // Simple mock coupon logic
    if (couponCode.toUpperCase() === "SAVE10") {
      setCouponDiscount(10);
    } else if (couponCode.toUpperCase() === "SAVE20") {
      setCouponDiscount(20);
    } else {
      setCouponDiscount(0);
      alert("Invalid coupon code");
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-3xl font-bold text-black mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {formatPrice(item.price * (1 - (item.discount || 0) / 100))} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(0, Number(e.target.value)))
                        }
                        className="w-12 text-center border border-gray-300 rounded py-1"
                        min="0"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-black mb-2">
                      {formatPrice(
                        item.price *
                          (1 - (item.discount || 0) / 100) *
                          item.quantity
                      )}
                    </p>
                    <div
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 mt-6 inline-block"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({couponDiscount}%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: SAVE10 or SAVE20
                </p>
              </div>

              {/* Checkout Button */}
              <button className="w-full btn-primary mb-3">Proceed to Checkout</button>
              <button
                onClick={clearCart}
                className="w-full btn-outline text-red-600 border-red-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
