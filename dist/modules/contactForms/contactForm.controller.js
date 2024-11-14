// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { contactFormService } from "./contactForm.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const submitContactForm = errorWrapper(async (req, res, next) => {
    const data = await contactFormService.submitContactForm({
        ...req.body,
    });
    return responseUtils.success(res, {
        data,
        status: 201,
    });
});
const submitAdminNewsLetter = errorWrapper(async (req, res, next) => {
    const data = await contactFormService.submitAdminNewsLetter({
        ...req.body,
    });
    return responseUtils.success(res, {
        data,
        status: 201,
    });
});
const getContactFormsByBusiness = errorWrapper(async (req, res, next) => {
    const paginationOptions = getPaginationOptions({
        limit: req.query?.limit,
        page: req.query?.page,
    });
    let query = {
        isDeleted: false,
        business: new ObjectId(req.user?._id),
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
    const data = await contactFormService.getContactFormsByBusiness({
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
export { submitContactForm, getContactFormsByBusiness, submitAdminNewsLetter };
