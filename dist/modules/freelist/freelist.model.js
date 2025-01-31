import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";
const FreeListSchema = new Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  logo: { type: String, required: false },
  password: {
    type: String,
    required: true,
  },
  address: {
    buildingName: String,
    streetName: String,
    landMark: String,
    district: String,
    state: String,
    pinCode: String,
  },
  contactDetails: {
    primaryNumber: String,
    secondaryNumber: String,
    whatsAppNumber: String,
    primaryCountryCode: String,
    secondaryCountryCode: String,
    whatsappCountryCode: String,
    email: String,
    website: String,
  },
  description: String,
  enconnectUrl: String,
  images: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  category: {
    type: ObjectId,
    ref: "categories",
  },
});
const FreeList = model("freelist", FreeListSchema);
export default FreeList;
