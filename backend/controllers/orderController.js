const Order = require("../models/order");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
  try {
    console.log(" Incoming order data:", req.body);
    console.log(" Authenticated user:", req.user);

    const { products, totalAmount, shippingAddress } = req.body;
    if (!products || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      orderId: uuidv4(),
      userId: req.user.id,
      products,
      totalAmount,
      shippingAddress,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(" Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Get logged-in user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "products.productId",
      "name price"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
