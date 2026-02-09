import Kitchen from "../models/kitchen.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import cloudinary, { uploadImage } from "../Utils/cloudniray.js";
import fs from "fs";

export const getAllKitchen = async (req, res) => {
  try {
    const kitchen = await Kitchen.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "kitchenId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRating: { $avg: "$reviews.rating" },
          reviewsCount: { $size: "$reviews" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "kitchenOwner",
          foreignField: "_id",
          as: "kitchenOwnerDetails",
        },
      },
      {
        $unwind: "$kitchenOwnerDetails",
      },

      {
        $project: {
          reviews: 0,
          kitchenOwnerDetails: {
            password: 0,
            email: 0,
            role: 0,
            createdAt: 0,
            updatedAt: 0,
            requestStatus: 0,
            __v: 0,
            cartItem: 0,
          },
        },
      },
    ]);
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
  let cloudinaryResponse = null;
  try {
    const { kitchenName, kitchenAddress, category } = req.body;

    const kitchenOwner = req.user._id;
    console.log("kitchenOwner", kitchenOwner)
    
    const owner = await User.findById(kitchenOwner);
    if (!owner || owner.role !== "vendor") {
      return res
        .status(403)
        .json({ success: false, message: "only vendor can register kitchen" });
    }

    //upload kitchen image to cloudinary
    console.log("in register kitchen",req.body)

    try {
      cloudinaryResponse = await uploadImage(req.file.path, "kitchenImages");
    } catch (error) {
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file after upload failure:", err)
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
    });

    console.log("newKitchen", newKitchen);
    //save kitchen to db

    await newKitchen.save();

    return res.status(201).json({
      success: true,
      message: "kitchen registered successfully",
      kitchen: newKitchen,
    });
  } catch (error) {
    console.error("error in registering kitchen", error);
    if (cloudinaryResponse?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResponse?.public_id);
    }
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

    const urlParts = kitchen.kitchenImageURL.split("/");
    const folder = urlParts[urlParts.length - 2];
    const fileNameWithExt = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExt.split(".")[0];

    const publicId = `${folder}/${fileName}`;
    //first delete kitchen from db then delete image from cloudinary
    const responce = await cloudinary.uploader.destroy(publicId);
    if (responce.result !== "ok") {
      throw new Error("failed to delete kitchen image from cloudinary");
    }
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

    const existingKitchen = await Kitchen.findById(kitchenId)
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    const updateData = {};
    let cloudinaryResponse = null;

    //if image is updated delete old image from cloudinary
    if (req.file) {
      const urlParts = existingKitchen.kitchenImageURL.split("/");
      const folder = urlParts[urlParts.length - 2];
      const fileNameWithExt = urlParts[urlParts.length - 1];
      const fileName = fileNameWithExt.split(".")[0];

      const publicId = `${folder}/${fileName}`;
      const responce = await cloudinary.uploader.destroy(publicId);
      if (responce.result !== "ok") {
        throw new Error("failed to delete kitchen image from cloudinary");
      }
      //upload new image
      cloudinaryResponse = await uploadImage(req.file.path, "kitchenImages");
    }
  

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
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file after failure:", err);
      }
    });
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
