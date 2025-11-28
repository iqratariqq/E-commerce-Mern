import Kitchen from "../models/kitchen.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import cloudinary, { uploadImage } from "../Utils/cloudniray.js";
import fs from "fs";

export const getAllKitchen = async (req, res) => {
  try {
    const kitchen = await Kitchen.find({}).populate(
      "kitchenOwner reviews",
      "userName location rating comment"
    );
    if (!kitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }

    return res.status(200).json({ success: true, kitchen });
  } catch (error) {
    console.log("error in get kitchen", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerKitchen = async (req, res) => {
  try {
    const { kitchenName, kitchenAddress, category } = req.body;

    const kitchenOwner = req.user._id;
    let cloudinaryResponse = null;
    const owner = await User.findById(kitchenOwner);
    if (!owner || owner.role !== "vendor") {
      return res
        .status(403)
        .json({ success: false, message: "only vendor can register kitchen" });
    }

    //upload kitchen image to cloudinary
    try {
      cloudinaryResponse = await uploadImage(req.file.path, "kitchenImages");
    } catch (error) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file after upload failure:", err);
          }
        });
      }
      return res.status(500).json({
        success: false,
        message: "error in uploading kitchen image",
        error: error?.message,
      });
    }

    const newKitchen = new Kitchen({
      kitchenName,
      kitchenOwner,
      kitchenAddress,
      category,
      kitchenImageURL: cloudinaryResponse ? cloudinaryResponse.secure_url : " ",
      kitchenImageId: cloudinaryResponse ? cloudinaryResponse.public_id : "",
    });

    //save kitchen to db
    try {
      await newKitchen.save();
    } catch (error) {
      //if error occurs delete uploaded image from cloudinary
      if (cloudinaryResponse?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResponse.public_id);
      }
      return res.status(500).json({
        success: false,
        message: "error in saving kitchen to db",
        error: error?.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "kitchen registered successfully",
      kitchen: newKitchen,
    });
  } catch (error) {
    console.error("error in registering kitchen", error);

    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error?.message,
    });
  }
};

export const deleteKitchenById = async (req, res) => {
  try {
    const { id: kitchenId } = req.params;
    const existingKitchen = await Kitchen.findById(kitchenId);
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
  

    const kitchen = await Kitchen.findByIdAndDelete(kitchenId);
    
    //first delete kitchen from db then delete image from cloudinary
    await cloudinary.uploader.destroy(existingKitchen.kitchenImageId);
    return res.status(200).json({
      success: true,
      message: "kitchen deleted successfully",
      kitchen,
    });
  } catch (error) {
    console.log("error in delete kitchen by id", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateKitchenStatus = async (req, res) => {
  try {
    const { id: kitchenId } = req.params;
    const { status } = req.body;
    const validStatus = ["open", "close", "busy"];
    if (!validStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid status value" });
    }
    const kitchen = await Kitchen.findByIdAndUpdate(
      kitchenId,
      { status },
      { new: true }
    );
    if (!kitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    return res.status(200).json({ success: true, kitchen });
  } catch (error) {
    console.log("error in update kitchen status", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateKitchen = async (req, res) => {
  try {
    console.log("req.body in updateKitchen", req.body);
    const { id: kitchenId } = req.params;

    const existingKitchen = await Kitchen.findById(kitchenId);
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    const updateData = {};
    let cloudinaryResponse = null;

    console.log("req.file in updateKitchen", req.file);
    //if image is updated delete old image from cloudinary
    if (req.file) {
      try {
 
        await cloudinary.uploader.destroy(existingKitchen.kitchenImageId);
        //upload new image
        cloudinaryResponse = await uploadImage(req.file.path, "kitchenImages");

      } catch (error) {
        console.error(
          "error in deleting old menu image from cloudinary",
          error
        );
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file after upload failure:", err);
          }
        });
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }

      //upload updated image
    }
    console.log("req.body", req.body);

    if (req.body?.status) updateData.status = req.body.status;
    if (req.body?.kitchenName) updateData.kitchenName = req.body.kitchenName;
    if (req.body?.kitchenAddress)
      updateData.kitchenAddress = req.body.kitchenAddress;
    if (req.body?.category) updateData.category = req.body.category;
    if (cloudinaryResponse?.secure_url)
      updateData.kitchenImageURL = cloudinaryResponse.secure_url;
    if (cloudinaryResponse?.public_id)
      updateData.kitchenImageId = cloudinaryResponse.public_id;

    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenId,
      updateData,
      { new: true }
    );

    return res.status(200).json({ success: true, kitchen: updatedKitchen });
  } catch (error) {
    console.log("error in update kitchen status", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedKitchens = async (req, res) => {
  try {
    // Step 1: get kitchens that are open
    const openKitchens = await Kitchen.find({ status: "open" }).lean();

    // Step 2: calculate rating for each kitchen
    const featured = [];

    for (let kitchen of openKitchens) {
      // fetch all reviews
      const reviews = await Review.find({ _id: { $in: kitchen.reviews } });

      if (reviews.length === 0) continue;

      // calculate avg rating
      const avgRating =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

      // criteria: good reviews + high rating
      if (avgRating >= 4 && reviews.length >= 2) {
        featured.push({
          ...kitchen,
          avgRating,
          reviewsCount: reviews.length,
        });
      }
    }

    return res.status(200).json({
      success: true,
      featuredKitchens: featured,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
