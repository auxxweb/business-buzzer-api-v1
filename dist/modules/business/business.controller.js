// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
import { businessService } from "./business.service.js";
const businessSignUp = errorWrapper(async (req, res, next) => {
  const data = await businessService.businessSignUp({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const businessLogin = errorWrapper(async (req, res, next) => {
  const data = await businessService.businessLogin({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getBusinessById = errorWrapper(async (req, res, next) => {
  const data = await businessService.getBusinessById(req.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { businessSignUp, businessLogin, getBusinessById };
