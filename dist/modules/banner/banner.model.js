import { model, Schema } from "mongoose";
const BannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
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
const Banner = model("banners", BannerSchema);
export default Banner;
