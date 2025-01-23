import { model, Schema } from "mongoose";

const FreeListSchema = new Schema(
  {
    name: { type: String, required: true },
    brandName: { type: String, required: true },
    logo: { type: String, required: false }, // URL as string
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
    images: [String], // Array of URLs
  },
  
);

const FreeList = model("freelist", FreeListSchema);

export default FreeList;
