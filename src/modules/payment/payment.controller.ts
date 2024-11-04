import { Response, NextFunction } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { paymentService } from "./payment.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const createPayment = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await paymentService.createPayment({
      ...req.body,
      business: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getPaymentListing = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await paymentService.getPaymentListing();

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

export { createPayment, getPaymentListing };
