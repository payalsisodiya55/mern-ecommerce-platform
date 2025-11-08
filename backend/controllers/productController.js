const Product = require("../models/product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
