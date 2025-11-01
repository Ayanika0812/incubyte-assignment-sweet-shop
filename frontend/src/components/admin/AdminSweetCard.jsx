import Button from '../ui/Button';
import Card from '../ui/Card';

const AdminSweetCard = ({ sweet, onDelete, onRestock }) => {
  const isLowStock = sweet.quantity < 5;
  const isOutOfStock = sweet.quantity === 0;
  
  return (
    <Card className="overflow-hidden">
      <Card.Content className="p-0">
        {/* Sweet Preview */}
        <div className="h-32 bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 flex items-center justify-center relative">
          <div className="text-4xl">🍬</div>
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
          <div className="flex gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => onRestock(sweet._id)}
              className="flex-1"
            >
              📦 Restock
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(sweet._id)}
              className="flex-1"
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