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
      imageURL: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : " ",
    });
    await product.save();
    return res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("error in addProduct controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, imageURL, quantity } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: false, message: "product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        imageURL,
        quantity,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "product updtae successfully" });
  } catch (error) {
    console.error("error in update product controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: false, message: "product not found" });
    }
    if (product.imageURL) {
      try {
        const productImageId = product.imageURL.split("/").pop().split(".")[0];
        console.log("productImageId", productImageId);
        await cloudinary.uploader.destroy(productImageId);
      } catch (error) {
        console.error("error in deleting product image from cloudinary", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
    }

    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "product delete successfully" });
  } catch (error) {
    console.error("error in delete product controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const { category } = req.params;
    const categoryProducts = await Product.find({ category });
    if (categoryProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    }
    return res.status(200).json({ success: true, categoryProducts });
  } catch (error) {
    console.error("error in getCategoryProducts controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      { $project: { _id: 1, name: 1, price: 1, imageURL: 1, category: 1 } },
    ]);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No recommended products found" });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("error in getRecommendedProducts controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleFeaturedroduct = async (req, res) => {
  try {
    const { id } = req.params;
    const featuredProduct = await Product.findById(id);
    if (featuredProduct) {
      featuredProduct.isFeatured = !featuredProduct.isFeatured;
      await updateFeaturedPro.save();
      await toggleFeaturedroductInRedis();
    }
  } catch (error) {
    console.error("error in toggleFeaturedroduct controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const toggleFeaturedroductInRedis = async () => {
  try {
    const featuredProduct = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProduct));
  } catch (error) {
    console.log("error in save toggleFeaturedroductInRedis", error);
  }
};
