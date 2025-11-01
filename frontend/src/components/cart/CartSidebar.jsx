import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import CartItem from './CartItem';
import EmptyState from '../ui/EmptyState';
import API from '../../api/axios';
import { showToast } from '../../utils/toast';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showToast.error('Your cart is empty!');
      return;
    }

    setIsPlacingOrder(true);
    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          sweetId: item._id,
          quantity: item.cartQuantity,
          price: item.price
        })),
        totalAmount: getTotalPrice()
      };

      // Place order via API
      await API.post('/orders', orderData);
      
      // Clear cart and show success
      clearCart();
      showToast.purchase('Order placed successfully! 🎉');
      onClose();
      
    } catch (error) {
      console.error('Order placement error:', error);
      showToast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <p className="text-sm text-gray-500">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <EmptyState
                icon="🛒"
                title="Your cart is empty"
                description="Add some delicious sweets to get started!"
                className="mt-8"
              />
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-pink-600">
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? '⏳ Placing Order...' : '🛒 Place Order'}
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={clearCart}
                  disabled={isPlacingOrder}
                >
                  🗑️ Clear Cart
                </Button>
              </div>

              {/* Order Info */}
              <div className="text-xs text-gray-500 text-center">
                <p>Orders are processed immediately</p>
                <p>Stock will be updated after order confirmation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;