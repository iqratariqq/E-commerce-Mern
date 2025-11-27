import mongoose, { set } from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter.js";

const menuSchema = new mongoose.Schema(
  {
    kitchen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },

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
    category: {
      type: String,
      enum: ["Lunch", "Dinner", "Breakfast", "Snacks", "Beverages"],
      default: "Lunch",
    },
    available: {
      type: Boolean,
      default: true,
    },
    imageURL: {
      type: String,
      required: [true, "imageURL is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;