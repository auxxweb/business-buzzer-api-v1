import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import Plans from "./plans.model.js";
import { ObjectId } from "../../constants/type.js";
import { checkAnyActiveBusinessesInPlans } from "./plans.utils.js";
import { appConfig } from "../../config/appConfig.js";
const createPlan = async (planData) => {
  const planExist = await Plans.findOne({
    plan: planData?.plan?.trim().toLowerCase(),
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
  if (planData?.plan && planExist?.plan !== planData?.plan) {
    const planNameExists = await Plans.findOne({
      _id: {
        $ne: new ObjectId(planId),
      },
      plan: {
        $regex: new RegExp(String(planData?.plan)),
        $options: "i",
      },
      isDeleted: false,
    });
    if (planNameExists) {
      return await generateAPIError(
        errorMessages?.planNameExists(planData?.plan),
        400,
      );
    }
  }
  if (planData?.isDeleted) {
    console.log(planData?.isDeleted, "isDeleted");
    if (planId === appConfig?.freePlanId) {
      return await generateAPIError(errorMessages.freePlanNotDelete, 400);
    }
    const isBusinessExists = await checkAnyActiveBusinessesInPlans(planId);
    console.log(isBusinessExists, "exists-plan-exists");
    if (isBusinessExists > 0) {
      return await generateAPIError(
        errorMessages?.businessExistsInPlan(isBusinessExists, planExist?.plan),
        400,
      );
    }
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
        isDeleted: true,
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
