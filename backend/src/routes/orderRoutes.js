const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

// User routes (require authentication)
router.post("/", auth, createOrder);
router.get("/my-orders", auth, getUserOrders);
router.get("/:id", auth, getOrderById);

// Admin routes (require admin role)
router.get("/admin/all", auth, admin, getAllOrders);
router.put("/admin/:id/status", auth, admin, updateOrderStatus);

module.exports = router;