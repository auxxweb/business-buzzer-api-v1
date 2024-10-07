import { model, Schema } from 'mongoose';
import { ObjectId } from '../../constants/type.js';
const PaymentSchema = new Schema({
    paymentId: {
        type: String,
        required: true,
    },
    plan: {
        type: ObjectId,
        ref: 'plans',
        required: true,
    },
    business: {
        type: ObjectId,
        ref: 'businesses',
        required: true,
    },
    paymentStatus: {
        type: String,
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
}, {
    timestamps: true,
});
const Payment = model('payments', PaymentSchema);
export default Payment;