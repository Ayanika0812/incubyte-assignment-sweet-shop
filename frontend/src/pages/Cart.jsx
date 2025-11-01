import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import CartItem from '../components/cart/CartItem';
import EmptyState from '../components/ui/EmptyState';
import Card from '../components/ui/Card';
import API from '../api/axios';
import { showToast } from '../utils/toast';

const Cart = () => {
  const navigate = useNavigate();
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
      navigate('/');
      
    } catch (error) {
      console.error('Order placement error:', error);
      showToast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Looks like you haven't added any sweet treats yet. Browse our delicious collection and add some goodies to your cart!"
            actionLabel="🍬 Browse Sweets"
            onAction={() => navigate('/')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Shopping Cart 🛒
            </h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            ← Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </Card.Header>
              
              <Card.Content className="space-y-4">
                {/* Items breakdown */}
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate pr-2">
                        {item.name} × {item.cartQuantity}
                      </span>
                      <span className="font-medium">
                        ₹{(item.price * item.cartQuantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-pink-600">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
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
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">📋 Order Information:</p>
                  <ul className="space-y-1">
                    <li>• Orders are processed immediately</li>
                    <li>• Stock will be updated after confirmation</li>
                    <li>• You'll receive an order confirmation</li>
                  </ul>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;