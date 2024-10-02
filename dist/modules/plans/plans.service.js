import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import Plans from "./plans.model.js";
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
        description: planData?.description,
    });
};
const getAllPlans = async ({ query, options, }) => {
    const [data, totalCount] = await Promise.all([
        Plans.find(query, {}, options),
        Plans.countDocuments(query),
    ]);
    return { data, totalCount };
};
export const planService = {
    createPlan,
    getAllPlans,
};
