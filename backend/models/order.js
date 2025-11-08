// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     orderId: { type: String, unique: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     products: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: Number,
//         price: Number,
//       },
//     ],
//     totalAmount: Number,
//     shippingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       city: String,
//       pincode: String,
//     },
//     orderStatus: {
//       type: String,
//       enum: ["Pending", "Processing", "Shipped", "Delivered"],
//       default: "Pending",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Completed"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
