import { model, Schema } from "mongoose";

const AdminNewsLetterSchema = new Schema(
  {
    email: {
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

const AdminNewsLetter = model("newsLetter", AdminNewsLetterSchema);
export default AdminNewsLetter;
