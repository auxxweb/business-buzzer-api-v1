import { Response, NextFunction, Request } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { termsAndConditionsService } from "./termsAndCondition.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const getTermsAndConditions = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await termsAndConditionsService.getTermsAndConditions(req.params.businessId);

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const createTermsAndConditions = errorWrapper(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const data = await termsAndConditionsService.createTermsAndConditions(req.user?._id, {
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const updateTermsAndConditions = errorWrapper(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const data = await termsAndConditionsService.updateTermsAndConditions(req.params?.id, req.user?._id,{
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const deleteTermsAndConditions = errorWrapper(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const data = await termsAndConditionsService.deleteTermsAndConditions(req.params.id, req.user?._id);

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

export {
    getTermsAndConditions,
    createTermsAndConditions,
    updateTermsAndConditions,
    deleteTermsAndConditions
}