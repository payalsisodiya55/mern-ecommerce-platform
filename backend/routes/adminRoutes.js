const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

const router = express.Router();

// Admin Dashboard Route
router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
