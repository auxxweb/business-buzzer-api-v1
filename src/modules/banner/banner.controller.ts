import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import Banner from "./banner.model.js";
import { bannerService } from "./banner.service.js";

const createBanner = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await bannerService.createBanner({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const deleteBanner = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await bannerService.deleteBanner(req.params?.id);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updateBanner = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await bannerService.updateBanner(req.params?.id, {
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const getAllBanners = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof Banner> = {
      isDeleted: false,
    };

    const data = await bannerService.getAllBanners({
      query: {
        ...query,
      },
      options: {
        sort: { createdAt: -1 },
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);


const getTrashBanners = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof Banner> = {
      isDeleted: true,
    };

    const data = await bannerService.getAllBanners({
      query: {
        ...query,
      },
      options: {
        sort: { createdAt: -1 },
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createBanner, getAllBanners,getTrashBanners, deleteBanner, updateBanner };
