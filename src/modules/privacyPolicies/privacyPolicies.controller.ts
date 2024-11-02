import { Response, NextFunction, Request } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { privacyPolicyService } from "./privacyPolicies.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const getPrivacyPolicy = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await privacyPolicyService.getPrivacyPolicy({
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const createPrivacyPolicy = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await privacyPolicyService.createPrivacyPolicy({
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const updatePrivacyPolicy = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await privacyPolicyService.updatePrivacyPolicy({
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

const deletePrivacyPolicy = errorWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await privacyPolicyService.deletePrivacyPolicy({
            ...req.body,
        });

        return responseUtils.success(res, {
            data,
            status: 201,
        });
    },
);

export {
    getPrivacyPolicy,
    createPrivacyPolicy,
    updatePrivacyPolicy,
    deletePrivacyPolicy
}