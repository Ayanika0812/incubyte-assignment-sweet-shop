const Sweet = require("../models/Sweet");
const fs = require('fs');
const path = require('path');

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    
    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      image: imageUrl
    });

    return res.status(201).json(sweet);
  } catch (error) {
    console.error("Add Sweet Error:", error);
    // Clean up uploaded file if sweet creation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    return res.status(200).json(sweets);
  } catch (error) {
    console.error("Get Sweets Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    return res.status(200).json(sweets);
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingSweet = await Sweet.findById(id);
    if (!existingSweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    // Handle image upload
    let updateData = { ...req.body };
    if (req.file) {
      // Delete old image if it exists
      if (existingSweet.image) {
        const oldImagePath = path.join(__dirname, '../../', existingSweet.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.status(200).json(updatedSweet);
  } catch (error) {
    console.error("Update Sweet Error:", error);
    // Clean up uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    // Delete associated image file
    if (sweet.image) {
      const imagePath = path.join(__dirname, '../../', sweet.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await Sweet.findByIdAndDelete(id);
    return res.status(200).json({ message: "Sweet deleted" });
  } catch (error) {
    console.error("Delete Sweet Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    return res.json({ success: true, message: "Purchase successful" });
  } catch (err) {
    console.error("Purchase Sweet Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const qty = req.body.qty || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += qty;
    await sweet.save();

    return res.status(200).json(sweet);
  } catch (error) {
    console.error("Restock Sweet Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

