import { model, Schema } from "mongoose";
const PlansCollection = new Schema({
    plan: {
        type: String,
        required: true,
        unique: true,
    },
    validity: {
        type: Number,
        required: true,
    },
    amount: Number,
    description: {
        type: [String],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Plans = model("plans", PlansCollection);
export default Plans;
