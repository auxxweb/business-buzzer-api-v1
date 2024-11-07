import { generateAPIError } from "errors/apiError.js";
import AdminTerms from "./adminTerms.model.js";
import { errorMessages } from "constants/messages.js";
const createAdminTerms = async (termsData) => {
  const termsExists = await AdminTerms.findOne({
    isDeleted: false,
  });
  if (termsExists) {
    return await generateAPIError(errorMessages.termsAndConditionsExists, 400);
  }
  return await AdminTerms.create(termsData);
};
const getAdminTerms = async () => {
  return await AdminTerms.findOne({
    isDeleted: false,
  });
};
const updateAdminTerms = async (termsData) => {
  return await AdminTerms.findOneAndUpdate(
    {
      isDeleted: false,
    },
    {
      ...(termsData?.data && {
        data: termsData?.data,
      }),
    },
    {
      new: true,
    },
  );
};
export const adminTermsService = {
  createAdminTerms,
  getAdminTerms,
  updateAdminTerms,
};
