const Product = require("../models/product");
const Order = require("../models/order");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

module.exports = { getDashboardStats };
