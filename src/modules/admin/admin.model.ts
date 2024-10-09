import { model, Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      set: (value: string) => value.toLowerCase(),
    },
    password: {
      type: String,
      minlength: 4,
      required: true,
    },
    image: {
      type: String,
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

const Admin = model("admins", AdminSchema);

export default Admin;
