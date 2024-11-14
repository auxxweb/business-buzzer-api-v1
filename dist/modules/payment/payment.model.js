import { model, Schema } from "mongoose";
import { ObjectId } from "../../constants/type.js";
import { PaymentStatus } from "./payment.enums.js";
const PaymentSchema = new Schema(
  {
    paymentId: {
      type: String,
    },
    plan: {
      type: ObjectId,
      ref: "plans",
      required: true,
    },
    business: {
      type: ObjectId,
      ref: "business",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.PENDING,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
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
const Payment = model("payments", PaymentSchema);
export default Payment;
