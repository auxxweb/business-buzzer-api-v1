import { Request, Response, NextFunction } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { paymentService } from "./payment.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { FilterQuery } from "mongoose";
import Payment from "./payment.model.js";
import crypto from "crypto";
import { appConfig } from "../../config/appConfig.js";
import { businessService } from "../business/business.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const createPayment = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req.body, "ppppppppppppppp");
    const data = await paymentService.createPayment({
      ...req.body,
      business: req?.user?._id,
    });
    console.log(data, "ithaaanjsbcjhbshbshbshbhsb");
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const checkPaymentStatus = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await paymentService.checkPaymentStatus(
      req?.user?._id as string,
    );
    console.log("something");

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updatePaymentWebHook = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const razorpaySignature = req.headers["x-razorpay-signature"] as string;
    const payload = JSON.stringify(req.body);

    // Generate expected signature using HMAC with SHA256
    const expectedSignature = crypto
      .createHmac("sha256", appConfig.webHookSecret)
      .update(payload)
      .digest("hex");

    const data = await paymentService.updatePaymentWebHook({
      razorpaySignature,
      expectedSignature,
      body: req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
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

const activateSpecialTrail = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { businessId } = req.body;

    const data = businessService.activateSpecialTail({ businessId });
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const deactivateSpecialTrail = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { businessId } = req.body;

    const data = await businessService.deactivateSpecialTail({ businessId });
    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

export {
  createPayment,
  getPaymentListing,
  getCurrentPlan,
  updatePaymentWebHook,
  checkPaymentStatus,
  activateSpecialTrail,
  deactivateSpecialTrail,
};
