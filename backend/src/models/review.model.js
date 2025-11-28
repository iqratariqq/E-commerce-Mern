import mongoose, { Mongoose } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    kitchenId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kitchen",
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment:{
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);
const Review=new mongoose.model("Review",reviewSchema)
export default Review
