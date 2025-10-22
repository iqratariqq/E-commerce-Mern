import mongoose from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    set: capitalizeFirstLetter,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  
});
