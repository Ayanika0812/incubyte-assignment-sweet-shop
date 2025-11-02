const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { 
    type: String, 
    default: null // URL to the image or base64 string
  },
  imagePublicId: { 
    type: String, 
    default: null // For Cloudinary or other cloud storage
  }
}, { timestamps: true });

module.exports = mongoose.model("Sweet", sweetSchema);
