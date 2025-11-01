import { useState } from 'react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    setIsUpdating(true);
    try {
      updateQuantity(item._id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    removeFromCart(item._id);
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
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-pink-100 shadow-sm">
      {/* Item Image/Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 rounded-xl flex items-center justify-center">
        <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">🍭 {item.category}</p>
        <p className="text-sm font-medium text-pink-600">₹{item.price} each</p>
        <p className="text-xs text-gray-400">Stock: {item.quantity} available</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.cartQuantity - 1)}
          disabled={isUpdating || item.cartQuantity <= 1}
          className="w-8 h-8 p-0 rounded-full"
        >
          −
        </Button>
        
        <span className="w-8 text-center font-medium text-gray-900">
          {item.cartQuantity}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(item.cartQuantity + 1)}
          disabled={isUpdating || item.cartQuantity >= item.quantity}
          className="w-8 h-8 p-0 rounded-full"
        >
          +
        </Button>
      </div>

      {/* Price & Remove */}
      <div className="text-right">
        <p className="font-bold text-gray-900">
          ₹{(item.price * item.cartQuantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 mt-1"
        >
          🗑️
        </Button>
      </div>
    </div>
  );
};

export default CartItem;