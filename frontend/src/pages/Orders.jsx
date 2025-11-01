import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import API from '../api/axios';
import { showToast } from '../utils/toast';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/orders/my-orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'primary',
      processing: 'primary',
      completed: 'success',
      cancelled: 'danger'
    };
    return variants[status] || 'default';
  };

  const getStatusEmoji = (status) => {
    const emojis = {
      pending: '⏳',
      confirmed: '✅',
      processing: '🔄',
      completed: '🎉',
      cancelled: '❌'
    };
    return emojis[status] || '📦';
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl border border-pink-100 shadow-lg p-6">
                  <div className="h-4 shimmer rounded w-1/4 mb-4"></div>
                  <div className="h-4 shimmer rounded w-1/2 mb-2"></div>
                  <div className="h-4 shimmer rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="You haven't placed any orders yet. Start shopping to see your order history here!"
            actionLabel="🍬 Start Shopping"
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
              Order History 📦
            </h1>
            <p className="text-gray-600 mt-1">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            ← Continue Shopping
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id} className="overflow-hidden">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(order.status)} size="md">
                    {getStatusEmoji(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </Card.Header>

              <Card.Content>
                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🍬</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.sweetId?.name || 'Unknown Sweet'}
                          </p>
                          <p className="text-sm text-gray-500">
                            🍭 {item.sweetId?.category || 'Unknown Category'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{item.price} × {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-pink-600">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;