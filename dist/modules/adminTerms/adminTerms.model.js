import { model, Schema } from "mongoose";
const AdminTermsSchema = new Schema(
  {
    data: {
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
const AdminTerms = model("adminTerms", AdminTermsSchema);
export default AdminTerms;
