import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { planService } from "./plans.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import Plans from "./plans.model.js";

const createPlan = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await planService.createPlan({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getPlanById = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await planService.getPlanById(req.params?.id);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updatePlan = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await planService.updatePlan(req.params?.id, {
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const updateTrashPlan = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await planService.updateTrashPlan(req.params?.id, {
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const getAllPlans = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    let query: FilterQuery<typeof Plans> = {
      isDeleted: false,
    };

    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            plan: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
        ],
      };
    }

    const data = await planService.getAllPlans({
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

const getTrashPlans = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    let query: FilterQuery<typeof Plans> = {
      isDeleted: true,
    };

    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            plan: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
        ],
      };
    }

    const data = await planService.getAllPlans({
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

export {
  createPlan,
  getAllPlans,
  getTrashPlans,
  updateTrashPlan,
  getPlanById,
  updatePlan,
};
