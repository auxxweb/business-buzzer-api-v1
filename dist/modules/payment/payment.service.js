/* eslint-disable no-case-declarations */
/* eslint-disable no-unreachable */
import Business from "../../modules/business/business.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import Payment from "./payment.model.js";
import Plans from "../../modules/plans/plans.model.js";
import { findExpiryDate } from "./payment.utils.js";
import { PaymentStatus } from "./payment.enums.js";
import { PlanStatus } from "../business/business.enum.js";
const createPayment = async (paymentData) => {
  const { plan, business } = paymentData;
  console.log({ paymentData });
  const businessExists = await Business.findOne({
    _id: new ObjectId(business),
    isDeleted: false,
  }).select("_id status");
  if (!businessExists) {
    return await generateAPIError(errorMessages.userNotFound, 400);
  }
  if (!businessExists?.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 400); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }
  if (businessExists?.isFreeTrailUsed) {
    return await generateAPIError(errorMessages.freePlanCompleted, 400);
  }
  const planDetails = await Plans.findOne({
    _id: new ObjectId(plan),
    isDeleted: false,
  }).select("plan amount");
  if (!planDetails) {
    return await generateAPIError(errorMessages.planNotValid, 400);
  }
  const expiry = await findExpiryDate({
    validity: planDetails?.validity ?? 0,
  });
  const paymentDatas = await Payment.create({
    business,
    date: new Date(),
    plan,
    amount: planDetails?.amount,
    expiryDate: expiry,
  });
  return paymentDatas;
};
const getPaymentListing = async ({ query, options }) => {
  console.log(query, "query", options);
  const [data, totalCount] = await Promise.all([
    Payment.find(query, {}, options).populate([
      {
        path: "business",
        select: "_id businessName email status rating",
      },
      {
        path: "plan",
      },
    ]),
    Payment.countDocuments(query),
  ]);
  return { data, totalCount };
};
const getCurrentPlan = async (businessId) => {
  console.log(businessId, "businessId");
  const payment = await Payment.findOne({
    business: new ObjectId(businessId),
    isDeleted: false,
    paymentStatus: PaymentStatus.SUCCESS,
  })
    .sort({ createdAt: -1 })
    .populate("plan", "amount validity isPremium description");
  const business = await Business.findById(businessId)
    .select("validity isFree plan isValid isFreeTrailUsed isInFreeTrail ")
    .populate("selectedPlan");
  if (!business) {
    return await generateAPIError(errorMessages.userNotFound, 400);
  }
  return { business, payment };
};
const updatePaymentWebHook = async ({
  razorpaySignature,
  expectedSignature,
  body,
}) => {
  console.log(razorpaySignature, "signature");
  console.log(expectedSignature, "expot");
  const metaData = body?.payload?.payment?.entity?.notes;
  const rPaymentId = body?.payload?.payment?.entity?.id;
  if (razorpaySignature === expectedSignature) {
    switch (body?.event) {
      case "payment.captured":
        // Handle payment captured event
        console.log("Payment captured:", metaData);
        const data = await Payment.findById(metaData?.payment_id);
        if (data) {
          const planValidity = await Plans.findById(data?.plan);
          const payData = await Payment.findByIdAndUpdate(
            metaData?.payment_id,
            {
              paymentId: rPaymentId,
              paymentStatus: PaymentStatus.SUCCESS,
            },
            {
              new: true,
            },
          );
          const validity = await findExpiryDate({
            validity: planValidity?.validity ?? 0,
          });
          await Business.findOneAndUpdate(
            {
              _id: new ObjectId(metaData?.businessId ?? ""),
              isDeleted: false,
            },
            {
              paymentStatus: true,
              plan: PlanStatus.PAID,
              isValid: true,
              validity: validity,
              selectedPlan: planValidity?._id,
            },
          );
          return payData;
        }
        return false;
      case "payment.failed":
        // Handle payment failed event
        console.log("Payment failed:", metaData);
        const data1 = await Payment.findById(metaData?.payment_id);
        if (data1) {
          const payData1 = await Payment.findByIdAndUpdate(
            metaData?.payment_id,
            {
              paymentId: rPaymentId,
              paymentStatus: PaymentStatus.FAILED,
            },
            {
              new: true,
            },
          );
          const businessData = await Business.findById(data1?.business);
          let updatedValidity =
            businessData?.validity instanceof Date
              ? businessData?.validity
              : new Date(businessData?.validity);
          const currentDate = new Date();
          let isStillValid = false;
          if (updatedValidity > currentDate) {
            isStillValid = true;
          }
          await Business.findOneAndUpdate(
            {
              _id: new ObjectId(String(data1?.business)),
              isDeleted: false,
            },
            {
              paymentStatus: false,
              plan: isStillValid ? businessData?.plan : PlanStatus.CANCELLED,
              isValid: isStillValid,
            },
          );
          return payData1;
        }
        return false;
      // Add more cases for different events if needed
      default:
        console.log("Unhandled event:", metaData);
        const data2 = await Payment.findById(metaData?.payment_id);
        if (data2) {
          const payData2 = await Payment.findByIdAndUpdate(
            metaData?.payment_id,
            {
              paymentId: rPaymentId,
              paymentStatus: PaymentStatus.FAILED,
            },
            {
              new: true,
            },
          );
          await Business.findOneAndUpdate(
            {
              _id: new ObjectId(String(data2?.business)),
              isDeleted: false,
            },
            {
              paymentStatus: false,
            },
          );
          return payData2;
        }
        return false;
    }
  }
};
const checkPaymentStatus = async (businessId) => {
  const data = await Payment.findOne({
    business: new ObjectId(businessId),
    isDeleted: false,
  })
    .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
    .exec();
  if (!data) {
    return await generateAPIError(errorMessages.paymentNotFound, 400);
  }
  return { PaymentStatus: data?.paymentStatus };
};
export const paymentService = {
  createPayment,
  getPaymentListing,
  getCurrentPlan,
  updatePaymentWebHook,
  checkPaymentStatus,
};
