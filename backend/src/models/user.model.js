import mongoose from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      set: capitalizeFirstLetter,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minlength: [6, "password must be at least 6 characters long"],
    },
    cartItem: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role:{
      type:String,
      enum:["customer","admin"],
      default:"customer"
    },
    address:{
      type:String,
      default:""
    }
  },
  { timestamps: true }
);

const User=mongoose.model("User",userSchema);
export default User;
