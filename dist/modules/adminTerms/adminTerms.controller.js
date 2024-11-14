import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { adminTermsService } from "./adminTerms.services.js";
const createAdminTerms = errorWrapper(async (req, res, next) => {
  const data = await adminTermsService.createAdminTerms({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const updateAdminTerms = errorWrapper(async (req, res, next) => {
  const data = await adminTermsService.updateAdminTerms({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getAdminTerms = errorWrapper(async (req, res, next) => {
  const data = await adminTermsService.getAdminTerms();
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createAdminTerms, getAdminTerms, updateAdminTerms };
