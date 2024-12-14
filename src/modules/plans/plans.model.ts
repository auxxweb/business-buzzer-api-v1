import { model, Schema } from "mongoose";

const PlansCollection = new Schema(
  {
    plan: {
      type: String,
      required: true,
      unique: true,
    },
    validity: {
      type: Number,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    amount: Number,
    actualAmount:Number,
    description: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Plans = model("plans", PlansCollection);

export default Plans;
