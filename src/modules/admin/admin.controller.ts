import { Response, NextFunction, Request } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { adminService } from "./admin.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const createAdmin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await adminService.createAdmin({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const adminLogin = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await adminService.adminLogin({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createAdmin, adminLogin };
