import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import ImageUpload from '../ui/ImageUpload';

const AddSweetForm = ({ onAddSweet }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      
      await onAddSweet(formData);
      
      // Reset form
      setForm({ name: '', category: '', price: '', quantity: '' });
      setSelectedImage(null);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.name && form.category && form.price && form.quantity;

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          ➕ Add New Sweet
        </h3>
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
              label="Initial Stock"
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
            onImageSelect={setSelectedImage}
            disabled={loading}
          />
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!isFormValid || loading}
          >
            {loading ? '⏳ Adding Sweet...' : '➕ Add Sweet to Inventory'}
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};

export default AddSweetForm;