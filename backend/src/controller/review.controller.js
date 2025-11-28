import Kitchen from "../models/kitchen.model.js";
import Review from "../models/review.model.js";

export const getReviews = async (req, res) => {
  try {
    const { id: kitchenId } = req.params;
    const reviews = await Review.find({ kitchenId }).populate(
      "userId",
      "userName"
    );
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no reviews found" });
    }

    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log("error in get reviews", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error in getReviews",
      error: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: kitchenId } = req.params;
    const { rating, comment } = req.body;

    if (!kitchenId || !rating) {
      return res.status(400).json({
        success: false,
        message: "invalid request data,must provide kitchenId and rating",
      });
    }
    const existingKitchen = await Kitchen.findById(kitchenId);
    if (!existingKitchen) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }
    const existingReview = await Review.findOne({ userId, kitchenId });
    if (existingReview) {
      return res
        .status(400)
        .json({ success: false, message: "your review already exists" });
    }
    const newReview = new Review({ userId, kitchenId, rating, comment });
    await newReview.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "review added successfully",
        review: newReview,
      });
  } catch (error) {
    console.log("error in add review", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error in addReview",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const userId = req.user._id;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "review not found" });
    }
    if (review.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "you are not authorized to delete this review",
        });
    }
    await Review.findByIdAndDelete(reviewId);
    return res
      .status(200)
      .json({ success: true, message: "review deleted successfully" });
  } catch (error) {
    console.log("error in delete review", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error in deleteReview",
      error: error.message,
    });
  }
};
