const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Create new order (user only)
router.post("/", protect, createOrder);

// Get all orders (admin)
router.get("/", protect, adminOnly, getAllOrders);

// Get user's own orders
router.get("/my-orders", protect, getUserOrders);

// Update order status (admin)
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
