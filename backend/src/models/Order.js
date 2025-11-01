const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  sweetId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Sweet", 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  }
});

const orderSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    items: [orderItemSchema],
    totalAmount: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "processing", "completed", "cancelled"], 
      default: "pending" 
    },
    orderNumber: { 
      type: String, 
      unique: true 
    }
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);