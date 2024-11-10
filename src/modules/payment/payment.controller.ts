import { Request, Response, NextFunction } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { paymentService } from "./payment.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { FilterQuery } from "mongoose";
import Payment from "./payment.model.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const createPayment = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await paymentService.createPayment({
      ...req.body,
      business: req?.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getPaymentListing = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    let query: FilterQuery<typeof Payment> = {
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
  },
);

const getCurrentPlan = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.user?._id, "apple-orange");

    const data = await paymentService.getCurrentPlan(req.user?._id as string);

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

export { createPayment, getPaymentListing, getCurrentPlan };
