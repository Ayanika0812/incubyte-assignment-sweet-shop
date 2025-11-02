import Button from '../ui/Button';
import Card from '../ui/Card';

const AdminSweetCard = ({ sweet, onDelete, onRestock, onEdit }) => {
  const isLowStock = sweet.quantity < 5;
  const isOutOfStock = sweet.quantity === 0;
  
  return (
    <Card className="overflow-hidden">
      <Card.Content className="p-0">
        {/* Sweet Preview */}
        <div className="h-32 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center relative overflow-hidden">
          {sweet.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${sweet.image}`}
              alt={sweet.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Fallback emoji */}
          <div className={`text-4xl ${sweet.image ? 'hidden' : 'flex'} items-center justify-center absolute inset-0`}>
            🍬
          </div>
          
          {/* Status badges */}
          {isOutOfStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              OUT OF STOCK
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              LOW STOCK
            </div>
          )}
        </div>
        
        {/* Sweet Details */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{sweet.name}</h3>
            <p className="text-sm text-gray-600">🍭 {sweet.category}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Price:</span>
              <div className="font-semibold text-pink-600">₹{sweet.price}</div>
            </div>
            <div>
              <span className="text-gray-500">Stock:</span>
              <div className={`font-semibold ${
                isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'
              }`}>
                📦 {sweet.quantity}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(sweet)}
                className="flex-1"
              >
                ✏️ Edit
              </Button>
              <Button
                variant="success"
                size="sm"
                onClick={() => onRestock(sweet._id)}
                className="flex-1"
              >
                📦 Restock
              </Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(sweet._id)}
              className="w-full"
            >
              🗑️ Delete
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default AdminSweetCard;