import { Response, NextFunction } from "express";
import { FilterQuery } from "mongoose";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { RequestWithUser } from "../../interface/app.interface.js";

import { ObjectId } from "../../constants/type.js";
import { newsService } from "./businessNews.service.js";
import BusinessNews from "./businessNews.model.js";

const createNews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await newsService.createNews({
      ...req.body,
      businessId: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getAllNews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof BusinessNews> = {
      isDeleted: false,
      businessId: new ObjectId(req.user?._id),
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const data = await newsService.getAllNews({
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

const getAllNewsById = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof BusinessNews> = {
      isDeleted: false,
      businessId: new ObjectId(req.params?.id),
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const data = await newsService.getAllNews({
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

const deleteNews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await newsService.deleteNews({
      newsId: req.params?.id,
      businessId: req.user?._id as string,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const updateNews = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await newsService.updateNews(req.params?.id, {
      ...req.body,
      businessId: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createNews, deleteNews, getAllNews, getAllNewsById, updateNews };
