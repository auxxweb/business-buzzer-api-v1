import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { businessReviewService } from "./businessReview.service.js";
import { RequestWithUser } from "interface/app.interface.js";
import BusinessReview from "./businessReviews.model.js";
import { ObjectId } from "../../constants/type.js";

const createBusinessReview = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await businessReviewService.createBusinessReview({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getAllReviews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof BusinessReview> = {
      isDeleted: false,
      businessId: new ObjectId(req.user?._id),
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const data = await businessReviewService.getAllReviews({
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
const getAllReviewsById = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof BusinessReview> = {
      isDeleted: false,
      businessId: new ObjectId(req.params?.id),
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const data = await businessReviewService.getAllReviews({
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

const deleteReviews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await businessReviewService.deleteReviews(req.params?.id, {
      businessId: req.body?.businessId,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export {
  createBusinessReview,
  deleteReviews,
  getAllReviews,
  getAllReviewsById,
};
