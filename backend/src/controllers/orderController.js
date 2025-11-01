const Order = require("../models/Order");
const Sweet = require("../models/Sweet");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.user.id;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    // Verify stock availability and update quantities
    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const sweet = await Sweet.findById(item.sweetId);
      
      if (!sweet) {
        return res.status(404).json({ message: `Sweet with ID ${item.sweetId} not found` });
      }

      if (sweet.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${sweet.name}. Available: ${sweet.quantity}, Requested: ${item.quantity}` 
        });
      }

      // Update sweet quantity
      sweet.quantity -= item.quantity;
      await sweet.save();

      // Add to order items
      orderItems.push({
        sweetId: item.sweetId,
        quantity: item.quantity,
        price: item.price
      });

      calculatedTotal += item.price * item.quantity;
    }

    // Verify total amount
    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return res.status(400).json({ message: "Total amount mismatch" });
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: calculatedTotal,
      status: "confirmed"
    });

    await order.save();

    // Populate order with sweet details
    await order.populate('items.sweetId', 'name category');
    await order.populate('userId', 'name email');

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        items: order.items,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt
      }
    });

  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ userId })
      .populate('items.sweetId', 'name category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ userId });

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNext: page < Math.ceil(totalOrders / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: id, userId })
      .populate('items.sweetId', 'name category')
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate('items.sweetId', 'name category')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNext: page < Math.ceil(totalOrders / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// Admin: Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "processing", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('items.sweetId', 'name category')
     .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error while updating order status" });
  }
};