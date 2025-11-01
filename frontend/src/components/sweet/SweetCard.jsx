import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';

const SweetCard = ({ sweet, onPurchase, showActions = true, showCartActions = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity < 5 && sweet.quantity > 0;
  const cartQuantity = getItemQuantity(sweet._id);
  
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await onPurchase(sweet._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(sweet);
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      'chocolate': '🍫',
      'candy': '🍬',
      'gummy': '🐻',
      'lollipop': '🍭',
      'cake': '🍰',
      'cookie': '🍪',
      'ice cream': '🍦',
      'donut': '🍩',
      'default': '🍬'
    };
    return emojiMap[category.toLowerCase()] || emojiMap.default;
  };
  
  return (
    <Card hover className="overflow-hidden group">
      <Card.Content className="p-0">
        {/* Sweet Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center relative overflow-hidden">
          <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
            <div className="text-6xl mb-2 animate-bounce">
              {getCategoryEmoji(sweet.category)}
            </div>
            <div className="text-sm text-gray-600 font-medium bg-white/80 px-2 py-1 rounded-full">
              {sweet.category}
            </div>
          </div>
          
          {/* Status Badges */}
          {isOutOfStock && (
            <div className="absolute top-3 right-3">
              <Badge variant="danger" size="sm">❌ Out of Stock</Badge>
            </div>
          )}
          {isLowStock && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning" size="sm">⚠️ Low Stock</Badge>
            </div>
          )}
        </div>
        
        {/* Sweet Details */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
              {sweet.name}
            </h3>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ₹{sweet.price}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <Badge variant="primary" size="sm">
              🍭 {sweet.category}
            </Badge>
            <Badge 
              variant={isOutOfStock ? 'danger' : isLowStock ? 'warning' : 'success'} 
              size="sm"
            >
              📦 {sweet.quantity} left
            </Badge>
          </div>
          
          {showActions && (
            <div className="space-y-2">
              {/* Add to Cart Button */}
              {showCartActions && (
                <Button
                  variant={isOutOfStock ? 'ghost' : 'secondary'}
                  size="md"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  {isOutOfStock ? '❌ Out of Stock' : cartQuantity > 0 ? `🛒 In Cart (${cartQuantity})` : '🛒 Add to Cart'}
                </Button>
              )}
              
              {/* Buy Now Button (if onPurchase is provided) */}
              {onPurchase && (
                <Button
                  variant={isOutOfStock ? 'ghost' : 'primary'}
                  size="md"
                  disabled={isOutOfStock || isLoading}
                  onClick={handlePurchase}
                  className="w-full"
                >
                  {isLoading ? '⏳ Processing...' : isOutOfStock ? '❌ Out of Stock' : '⚡ Buy Now'}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default SweetCard;