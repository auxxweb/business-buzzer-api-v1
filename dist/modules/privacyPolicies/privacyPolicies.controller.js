// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { privacyPolicyService } from "./privacyPolicies.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const getPrivacyPolicy = errorWrapper(async (req, res, next) => {
  const data = await privacyPolicyService.getPrivacyPolicy(
    req.params.businessId,
  );
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const createPrivacyPolicy = errorWrapper(async (req, res, next) => {
  const data = await privacyPolicyService.createPrivacyPolicy(req.user?._id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const updatePrivacyPolicy = errorWrapper(async (req, res, next) => {
  const data = await privacyPolicyService.updatePrivacyPolicy(
    req.params.id,
    req.user?._id,
    {
      ...req.body,
    },
  );
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const deletePrivacyPolicy = errorWrapper(async (req, res, next) => {
  const data = await privacyPolicyService.deletePrivacyPolicy(
    req.params.id,
    req.user?._id,
  );
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
export {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
};
