// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { paymentService } from "./payment.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const createPayment = errorWrapper(async (req, res, next) => {
  const data = await paymentService.createPayment({
    ...req.body,
    business: "672a623f79929725c9fe4799",
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getPaymentListing = errorWrapper(async (req, res, next) => {
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
          paymentId: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
        {
          paymentStatus: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
      ],
    };
  }
  const data = await paymentService.getPaymentListing({
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
const getCurrentPlan = errorWrapper(async (req, res, next) => {
  console.log(req.user?._id, "apple-orange");
  const data = await paymentService.getCurrentPlan(req.user?._id);
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
export { createPayment, getPaymentListing, getCurrentPlan };
