import mongoose, { Mongoose } from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter.js";

const kitchenSchema = new mongoose.Schema(
  {
    kitchenName:{
        type: String,
        required: true,
        unique: true,
        set:capitalizeFirstLetter
    },
    kitchenOwener:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    reviews:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        default:[]

    },
    status:{
        type: String,
        enum:["close","open","busy"],
        default:"close"
    },
    menuItems:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default:[]
    }

  },
  { timestamps: true }
);
const Kitchen=new mongoose.Model("Kitchen",kitchenSchema)
export default Kitchen
