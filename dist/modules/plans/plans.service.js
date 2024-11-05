import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import Plans from "./plans.model.js";
import { ObjectId } from "../../constants/type.js";
const createPlan = async (planData) => {
  const planExist = await Plans.findOne({
    plan: planData?.plan,
    isDeleted: false,
  });
  if (planExist) {
    return await generateAPIError(errorMessages.planExists, 400);
  }
  return await Plans.create({
    plan: planData?.plan,
    validity: planData?.validity,
    amount: planData?.amount,
    isPremium: planData?.isPremium,
    description: planData?.description,
  });
};
const getAllPlans = async ({ query, options }) => {
  const [data, totalCount] = await Promise.all([
    Plans.find(query, {}, options),
    Plans.countDocuments(query),
  ]);
  return { data, totalCount };
};
const getPlanById = async (planId) => {
  const planExist = await Plans.findOne({
    _id: new ObjectId(planId),
    isDeleted: false,
  });
  if (!planExist) {
    return await generateAPIError(errorMessages.planNotFound, 400);
  }
  return planExist;
};
const updatePlan = async (planId, planData) => {
  const planExist = await Plans.findOne({
    _id: new ObjectId(planId),
    isDeleted: false,
  });
  if (!planExist) {
    return await generateAPIError(errorMessages.planNotFound, 400);
  }
  return await Plans.findOneAndUpdate(
    {
      _id: new ObjectId(planId),
      isDeleted: false,
    },
    {
      ...(planData?.plan && {
        plan: planData?.plan,
      }),
      ...(planData?.validity && {
        validity: planData?.validity,
      }),
      ...(planData?.amount && {
        amount: planData?.amount,
      }),
      ...(planData?.isPremium && {
        isPremium: planData?.isPremium,
      }),
      ...(planData?.description && {
        description: planData?.description,
      }),
      ...(planData?.isDeleted && {
        isDeleted: planData?.isDeleted,
      }),
    },
    { new: true },
  );
};
export const planService = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
};
