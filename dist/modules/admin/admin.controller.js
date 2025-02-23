// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { adminService } from "./admin.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const createAdmin = errorWrapper(async (req, res, next) => {
  const data = await adminService.createAdmin({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const forgotPasswordAdmin = errorWrapper(async (req, res, next) => {
  const data = await adminService.forgotPasswordAdmin(req.body?.email);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const adminLogin = errorWrapper(async (req, res, next) => {
  const data = await adminService.adminLogin({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updatePassword = errorWrapper(async (req, res, next) => {
  const data = await adminService.updatePassword({
    adminId: req.user?._id,
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const resetPassword = errorWrapper(async (req, res, next) => {
  const data = await adminService.resetPassword({
    adminId: req.user?._id,
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export {
  createAdmin,
  resetPassword,
  adminLogin,
  updatePassword,
  forgotPasswordAdmin,
};
