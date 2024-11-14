import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { leadService } from "./review.service.js";
const createLead = errorWrapper(async (req, res, next) => {
    const data = await leadService.createLead({
        ...req.body,
    });
    return responseUtils.success(res, {
        data,
        status: 201,
    });
});
const getAllLeads = errorWrapper(async (req, res, next) => {
    const paginationOptions = getPaginationOptions({
        limit: req.query?.limit,
        page: req.query?.page,
    });
    const query = {
        isDeleted: false,
    };
    const data = await leadService.getAllLeads({
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
});
export { createLead, getAllLeads };
