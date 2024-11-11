import { Response, NextFunction, Request } from "express";
// import { FilterQuery } from 'mongoose'

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { contactFormService } from "./contactForm.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import ContactForm from "./contactForm.model.js";
import { FilterQuery } from "mongoose";
import { ObjectId } from "../../constants/type.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

const submitContactForm = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await contactFormService.submitContactForm({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const submitAdminNewsLetter = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await contactFormService.submitAdminNewsLetter({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getContactFormsByBusiness = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    let query: FilterQuery<typeof ContactForm> = {
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
  },
);

export { submitContactForm, getContactFormsByBusiness, submitAdminNewsLetter };
