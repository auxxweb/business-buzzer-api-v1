// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { notificationService } from "./notification.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const getNotificationByUser = errorWrapper(async (req, res, next) => {
  const data = await notificationService.getNotificationByUser(req.user?._id);
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
export { getNotificationByUser };
