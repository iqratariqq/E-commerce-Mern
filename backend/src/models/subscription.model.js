import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    kitchen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    subscriptionType: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "price cannot be negative"],
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-set endDate based on type
SubscriptionSchema.pre("save", function (next) {
  const start = this.startDate;

  if (this.subscriptionType === "daily") {
    this.endDate = new Date(start.getTime() + 1 * 24 * 60 * 60 * 1000);
  }
  if (this.subscriptionType === "weekly") {
    this.endDate = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  if (this.subscriptionType === "monthly") {
    this.endDate = new Date(start.setMonth(start.getMonth() + 1));
  }

  next();
});

export default mongoose.model("Subscription", SubscriptionSchema);
