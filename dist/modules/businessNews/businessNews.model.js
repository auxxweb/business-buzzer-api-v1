import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";
const BusinessNewsSchema = new Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "businesses",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const BusinessNews = model("business_news", BusinessNewsSchema);
export default BusinessNews;
