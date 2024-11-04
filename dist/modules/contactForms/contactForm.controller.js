// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { contactFormService } from "./contactForm.service.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
const submitContactForm = errorWrapper(async (req, res, next) => {
  const data = await contactFormService.submitContactForm(
    req.params.businessId,
    {
      ...req.body,
    },
  );
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getContactFormsByBusiness = errorWrapper(async (req, res, next) => {
  const data = await contactFormService.getContactFormsByBusiness(
    req.user?._id,
  );
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
export { submitContactForm, getContactFormsByBusiness };
