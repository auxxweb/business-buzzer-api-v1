import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { categoryService } from "./category.service.js";
import Category from "./category.model.js";

const createCategory = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await categoryService.createCategory({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getAllCategories = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    let query: FilterQuery<typeof Category> = {
      isDeleted: false,
    };

    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            name: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
        ],
      };
    }

    const data = await categoryService.getAllCategories({
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

export { createCategory, getAllCategories };