import mongoose from "mongoose";
import Product from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // use req.body to access the request body

  if (
    !product.name ||
    !product.price ||
    !product.description ||
    !product.image
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, msg: "Product created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, msg: "Invalid Id" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ success: false, msg: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, msg: "Invalid Id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};
