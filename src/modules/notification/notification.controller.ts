import { Response, NextFunction } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { notificationService } from "./notification.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const getNotificationByUser = errorWrapper(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const data = await notificationService.getNotificationByUser(req.user?._id);

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

export {
    getNotificationByUser
}