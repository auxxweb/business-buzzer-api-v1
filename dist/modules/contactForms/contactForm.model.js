import { model, Schema } from "mongoose";
import { ObjectId } from "../../constants/type.js";
const ContactFormSchema = new Schema(
  {
    business: {
      type: ObjectId,
      ref: "business",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
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
const ContactForm = model("contact_forms", ContactFormSchema);
export default ContactForm;
