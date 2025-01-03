import { responseUtils } from "../utils/response.utils.js";
import { errorWrapper } from "../middleware/errorWrapper.js";
import { successMessages } from "../constants/messages.js";
import Business from "modules/business/business.model.js";
const createBusId = async (businessCount) => {
  const paddedCount = String(businessCount + 10).padStart(8, "0");
  return `ENC${paddedCount}`;
};
const healthCheck = errorWrapper(async (req, res, next) => {
  const businesses = await Business.find({}, { createdAt: 1 });
  let busCount = 0;
  for (const business of businesses) {
    // Ensure the businessId is being set correctly
    business.businessId = await createBusId(busCount); // No need for await if createBusId is not async
    await business.save(); // Save the updated business
    busCount += 1; // Increment the counter
  }
  return responseUtils.success(res, {
    data: {
      message: successMessages.healthOk,
      timestamp: new Date().toISOString(),
    },
    status: 200,
  });
});
export { healthCheck };
