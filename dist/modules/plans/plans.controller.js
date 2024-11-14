import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { planService } from "./plans.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
const createPlan = errorWrapper(async (req, res, next) => {
  const data = await planService.createPlan({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getPlanById = errorWrapper(async (req, res, next) => {
  const data = await planService.getPlanById(req.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updatePlan = errorWrapper(async (req, res, next) => {
  const data = await planService.updatePlan(req.params?.id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllPlans = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  let query = {
    isDeleted: false,
  };
  const searchTerm = req.query?.searchTerm;
  if (searchTerm) {
    query = {
      ...query,
      $or: [
        {
          plan: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
      ],
    };
  }
  const data = await planService.getAllPlans({
    query: {
      ...query,
    },
    options: {
      ...paginationOptions,
      sort: { createdAt: -1 },
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createPlan, getAllPlans, getPlanById, updatePlan };
