import Product from "../models/product.model.js";
import { redis } from "../Utils/redis.js";
import cloudinary from "../Utils/cloudniray.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("error in getProducts controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    //first check in redis cache
    let featuredProducts = await redis.get("featuredProducts");

    if (featuredProducts) {
      return res.status(200).json({
        success: true,
        featuredProducts: JSON.parse(featuredProducts),
      });
    }
    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (featuredProducts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No featured products found" });
    }
    //store in redis cache for future requests
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    return res.status(200).json({ success: true, featuredProducts });
  } catch (error) {
    console.error("error in getFeaturedProducts controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  const { name, price, description, category, imageURL, quantity } = req.body;
  try {
    let cloudinaryResponse = null;
    if (imageURL) {
      cloudinaryResponse = await cloudinary.uploader.upload(imageURL, {
        folder: "products",
      });
    }
    const product = new Product({
      name,
      price,
      description,
      category,
      quantity,
      imageURL: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : " "
    });
    await product.save();
    return res.status(201).json({ success: true, product });

  } catch (error) {
    console.error("error in addProduct controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error.message });
  }
};
