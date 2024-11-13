/* eslint-disable no-case-declarations */
/* eslint-disable no-unreachable */
import Business from "../../modules/business/business.model.js";
import { PaymentData } from "./payment.interface.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import Payment from "./payment.model.js";
import Plans from "../../modules/plans/plans.model.js";
import { findExpiryDate } from "./payment.utils.js";
// import { PaymentStatus } from './payment.enums.js'
import { FilterQuery, QueryOptions } from "mongoose";
import { PaymentStatus } from "./payment.enums.js";

const createPayment = async (paymentData: PaymentData): Promise<any> => {
  const { paymentId, plan, business, date } = paymentData;

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

  const planData = await Plans.findOne({
    _id: new ObjectId(plan),
    isDeleted: false,
  });

  if (!planData) {
    return await generateAPIError(errorMessages.planNotFound, 400);
  }

  const expiry = await findExpiryDate({
    date,
    validity: planData?.validity,
  });

  const planDetails = await Plans.findOne({
    _id: new ObjectId(plan),
    isDeleted: false,
  }).select("plan amount");

  if (!planDetails) {
    return await generateAPIError(errorMessages.planNotValid, 400);
  }

  const paymentDatas = await Payment.create({
    paymentId,
    business,
    date,
    plan,
    amount: planDetails?.amount,
    expiryDate: expiry,
  });

  return paymentDatas;
};

const getPaymentListing = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Payment>;
  options: QueryOptions;
}): Promise<any> => {
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

const getCurrentPlan = async (businessId: string): Promise<any> => {
  console.log(businessId, "businessId");

  const data = await Payment.findOne({
    business: new ObjectId(businessId),
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "plan",
      select: "plan amount validity",
    });

  if (!data) {
    return await generateAPIError(errorMessages.paymentNotFound, 400);
  }
  return data;
};

const updatePaymentWebHook = async ({
  razorpaySignature,
  expectedSignature,
  body,
}: any): Promise<any> => {
  console.log(razorpaySignature, "signature");
  console.log(expectedSignature, "expot");

  const metaData = body?.payload?.payment?.entity?.notes;

  switch (body?.event) {
    case "payment.captured":
      // Handle payment captured event
      console.log("Payment captured:", metaData);
      const data = await Payment.findOne({
        _id: new ObjectId(metaData?.paymentId ?? ""),
        isDeleted: false,
      });

      if (data) {
        return await Payment.findOneAndUpdate(
          {
            _id: new ObjectId(metaData?.paymentId ?? ""),
            isDeleted: false,
          },
          {
            paymentStatus: PaymentStatus.SUCCESS,
          },
          {
            new: true,
          },
        );
      }
      return false;
      break;

    case "payment.failed":
      // Handle payment failed event
      console.log("Payment failed:", metaData);
      const data1 = await Payment.findOne({
        _id: new ObjectId(metaData?.paymentId ?? ""),
        isDeleted: false,
      });
      if (data1) {
        return await Payment.findOneAndUpdate(
          {
            _id: new ObjectId(metaData?.paymentId ?? ""),
            isDeleted: false,
          },
          {
            paymentStatus: PaymentStatus.FAILED,
          },
          {
            new: true,
          },
        );
      }
      return false;
      break;
    // Add more cases for different events if needed
    default:
      console.log("Unhandled event:", metaData);
      const data2 = await Payment.findOne({
        _id: new ObjectId(metaData?.paymentId ?? ""),
        isDeleted: false,
      });
      if (data2) {
        return await Payment.findOneAndUpdate(
          {
            _id: new ObjectId(metaData?.paymentId ?? ""),
            isDeleted: false,
          },
          {
            paymentStatus: PaymentStatus.FAILED,
          },
          {
            new: true,
          },
        );
      }
      return false;
  }
};

const checkPaymentStatus = async (paymentId: string): Promise<any> => {
  const data = await Payment.findOne({
    _id: new ObjectId(paymentId),
    isDeleted: false,
  });

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
