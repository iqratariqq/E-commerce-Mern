import mongoose from "mongoose";
import { capitalizeFirstLetter } from "../Utils/capitalizeFirstLetter.js";

const kitchenSchema = new mongoose.Schema(
  {
    kitchenName: {
      type: String,
      required: true,
      unique: true,
      set: capitalizeFirstLetter
    },

    kitchenOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    kitchenAddress: {
      type: String,
      required: true,
    },


    kitchenImageURL: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "continental"
    },

    status: {
      type: String,
      enum: ["close","open","busy"],
      default: "open"
    },

    menuItems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: []
    }],

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0]
      }
    },



  },
  { timestamps: true }
);

// 2dsphere index for geo queries
kitchenSchema.index({ location: "2dsphere" });

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

export default Kitchen;