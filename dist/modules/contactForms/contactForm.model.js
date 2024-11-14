import { model, Schema } from "mongoose";
import { ObjectId } from "../../constants/type.js";
const ContactFormSchema = new Schema({
    business: {
        type: ObjectId,
        ref: "business",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const ContactForm = model("contact_forms", ContactFormSchema);
export default ContactForm;
