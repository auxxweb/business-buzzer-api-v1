import { Request, Response, NextFunction } from "express";

import { responseUtils } from "../utils/response.utils.js";
import { errorWrapper } from "../middleware/errorWrapper.js";
import { successMessages } from "../constants/messages.js";

const healthCheck = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    return responseUtils.success(res, {
      data: {
        message: successMessages.healthOk,
        timestamp: new Date().toISOString(),
      },
      status: 200,
    });
  },
);

export { healthCheck };
