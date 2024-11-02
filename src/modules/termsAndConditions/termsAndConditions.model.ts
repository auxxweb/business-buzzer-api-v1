import { model, Schema } from "mongoose";

const TermsAndConditionsSchema = new Schema(
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

const TermsAndCondition = model("termsAndConditions", TermsAndConditionsSchema);
export default TermsAndCondition;
