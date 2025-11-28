import Kitchen from "../models/kitchen.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { uploadImage } from "../Utils/cloudniray.js";

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

export const registerKitchen=async(req,res)=>{
  try {
    const{kitchenName,kitchenAddress,category}=req.body
   
    const kitchenOwner=req.user._id
    let cloudinaryResponse =null
    const owner=await User.findById(kitchenOwner)
    if(!owner || owner.role!=="vendor" ){
      return res.status(403).json({success:false,message:"only vendor can register kitchen"})
    }
    try {
      
      cloudinaryResponse = await uploadImage(req.file.path,'kitchenImages')
    } catch (error) {
      throw new Error("Image upload failed");
    }

    const newKitchen=new Kitchen({
      kitchenName,
      kitchenOwner, 
      kitchenAddress,
      category,
      kitchenImageURL: cloudinaryResponse ? cloudinaryResponse.secure_url : " "
    });
    await newKitchen.save();
    res.status(201).json({success:true,message:"kitchen registered successfully",kitchen:newKitchen})
  } catch (error) {
    console.error("error in registering kitchen",error);
    res.status(500).json({success:false,message:"internal server error",error:error?.message})
    
  }
}

export const deleteKitchenById = async (req, res) => {
  try {
    const { id: kitchenId } = req.params;
    const existingKitchen = await Kitchen.findById(kitchenId);
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    const kitchenImageId = existingKitchen.kitchenImageURL
      .split("/")
      .pop()
      .split(".")[0];
    console.log("kitchenImageId", kitchenImageId);
    await cloudinary.uploader.destroy(kitchenImageId);

    const kitchen = await Kitchen.findByIdAndDelete(kitchenId);

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
    const { id: kitchenId } = req.params;
    const { status, kitchenName, kitchenAddress, category } = req.body;

    const existingKitchen = await Kitchen.findById(kitchenId);
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    //if image is updated delete old image from cloudinary
    if (req.file) {
      try {
        const kitchenImageId = existingKitchen.kitchenImageURL
          .split("/")
          .pop()
          .split(".")[0];
        console.log("kitchenImageId", kitchenImageId);
        await cloudinary.uploader.destroy(kitchenImageId);
      } catch (error) {
        console.error(
          "error in deleting old menu image from cloudinary",
          error
        );
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
      //upload updated image
      cloudinaryResponse = await uploadImage(req.file.path, "Kitchen");
    }

    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenId,
      {
        status,
        kitchenName,
        kitchenAddress,
        category,
        kitchenImageURL: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : existingKitchen.kitchenImageURL,
      },
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
