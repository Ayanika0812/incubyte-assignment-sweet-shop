import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import ImageUpload from '../ui/ImageUpload';

const EditSweetModal = ({ sweet, isOpen, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sweet) {
      setForm({
        name: sweet.name || '',
        category: sweet.category || '',
        price: sweet.price || '',
        quantity: sweet.quantity || '',
      });
    }
  }, [sweet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', Number(form.price));
      formData.append('quantity', Number(form.quantity));
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      await onUpdate(sweet._id, formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.name && form.category && form.price && form.quantity;

  if (!isOpen) return null;

  const currentImageUrl = sweet?.image 
    ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${sweet.image}`
    : null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  ✏️ Edit Sweet
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </Button>
              </div>
            </Card.Header>
            
            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Sweet Name"
                    placeholder="e.g., Chocolate Truffle"
                    value={form.name}
                    onChange={handleChange}
                    icon="🍬"
                    required
                  />
                  
                  <Input
                    name="category"
                    label="Category"
                    placeholder="e.g., Chocolate, Candy"
                    value={form.category}
                    onChange={handleChange}
                    icon="🍭"
                    required
                  />
                  
                  <Input
                    name="price"
                    label="Price (₹)"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    icon="💰"
                    required
                  />
                  
                  <Input
                    name="quantity"
                    label="Stock Quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.quantity}
                    onChange={handleChange}
                    icon="📦"
                    required
                  />
                </div>

                {/* Image Upload */}
                <ImageUpload
                  label="Sweet Image"
                  currentImage={currentImageUrl}
                  onImageSelect={setSelectedImage}
                  disabled={loading}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!isFormValid || loading}
                    className="flex-1"
                  >
                    {loading ? '⏳ Updating...' : '✅ Update Sweet'}
                  </Button>
                </div>
              </form>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditSweetModal;