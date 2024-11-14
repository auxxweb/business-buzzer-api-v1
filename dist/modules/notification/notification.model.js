import { model, Schema } from "mongoose";
import { ObjectId } from "../../constants/type.js";
const NotificationSchema = new Schema(
  {
    senderId: {
      type: ObjectId,
      required: true,
    },
    receiverId: {
      type: ObjectId,
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
const Notification = model("notifications", NotificationSchema);
export default Notification;
