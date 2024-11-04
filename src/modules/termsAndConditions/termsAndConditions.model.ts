import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";

const TermsAndConditionsSchema = new Schema(
  {
    business: {
      type: ObjectId,
      ref: "business",
      required: true,
    },

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

const TermsAndCondition = model(
  "terms_and_conditions",
  TermsAndConditionsSchema,
);
export default TermsAndCondition;
