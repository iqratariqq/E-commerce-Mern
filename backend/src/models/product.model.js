import mongoose, { set } from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    set: capitalizeFirstLetter,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    min: [0, "price cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
    min: [0, "quantity cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
    trim: true,
    set: capitalizeFirstLetter,
  },
  imageURL: {
    type: String,
    required: [true, "imageURL is required"],
  },
  isFeatured:{
    type:Boolean,
    default:false,
  }
},{ timestamps: true });

const Product=mongoose.model("Product", productSchema);
export default Product;

