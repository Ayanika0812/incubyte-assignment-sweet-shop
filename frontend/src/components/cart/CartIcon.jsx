import { useCart } from '../../context/CartContext';
import Badge from '../ui/Badge';

const CartIcon = ({ onClick, className = '' }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-pink-600 transition-colors ${className}`}
    >
      <div className="relative">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
          />
        </svg>
        
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2">
            <Badge variant="danger" size="sm" className="min-w-[20px] h-5 flex items-center justify-center text-xs">
              {totalItems > 99 ? '99+' : totalItems}
            </Badge>
          </div>
        )}
      </div>
    </button>
  );
};

export default CartIcon;