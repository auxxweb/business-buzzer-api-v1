import { model, Schema } from "mongoose";

const PrivacyPoliciesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

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

const PrivacyPolicy = model("privacyPolicies", PrivacyPoliciesSchema);
export default PrivacyPolicy;
