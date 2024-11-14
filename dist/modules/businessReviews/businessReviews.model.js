import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";
const BusinessReviewSchema = new Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "businesses",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const BusinessReview = model("business_reviews", BusinessReviewSchema);
export default BusinessReview;
