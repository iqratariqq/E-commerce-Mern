import mongoose, { Mongoose } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    discountPercentage: {
      type: String,
      required: true,
      min: 0,
      max: 100,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique:true
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default:true
    },
  },
  { timestamps: true }
);
const Coupon=new mongoose.model("Coupon",couponSchema)
export default Coupon
