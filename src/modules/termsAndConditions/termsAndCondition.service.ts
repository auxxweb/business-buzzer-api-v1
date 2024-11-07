import TermsAndCondition from "./termsAndConditions.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";

const getTermsAndConditions = async (businessId: string): Promise<any> => {
  console.log("calling", businessId);

  const termsAndConditions = await TermsAndCondition.findOne({
    business: new ObjectId(businessId),
    isDeleted: false,
  });
  if (!termsAndConditions) {
    return await generateAPIError(
      errorMessages.termsAndConditionsNotFound,
      400,
    );
  }
  return termsAndConditions;
};

const createTermsAndConditions = async (data: {
  data: string;
  businessId: string;
}): Promise<any> => {
  const exists = await TermsAndCondition.findOne({
    business: new ObjectId(data?.businessId),
    isDeleted: false,
  });

  if (exists) {
    return await generateAPIError(errorMessages.termsAndConditionsExists, 400);
  }

  return await TermsAndCondition.create({
    business: data?.businessId,
    data: data?.data,
  });
};

const updateTermsAndConditions = async (
  businessId: string,
  data: { data: string },
): Promise<any> => {
  const termsAndCondition = await TermsAndCondition.findOne({
    business: new ObjectId(businessId),
    isDeleted: false,
  });

  if (termsAndCondition == null) {
    return await generateAPIError(
      errorMessages.termsAndConditionsNotFound,
      400,
    );
  }

  console.log(data, "data");

  return await TermsAndCondition.findOneAndUpdate(
    {
      business: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      ...(data?.data && {
        data: data?.data,
      }),
    },
    {
      new: true,
    },
  );
};

const deleteTermsAndConditions = async (
  id: string,
  businessId: any,
): Promise<any> => {
  const termsAndCondition = await TermsAndCondition.findOne({
    _id: new ObjectId(id),
    business: new ObjectId(businessId),
  });

  if (termsAndCondition == null) {
    return await generateAPIError(
      errorMessages.termsAndConditionsNotFound,
      404,
    );
  }

  await termsAndCondition.deleteOne();

  return {
    message: successMessages.deleteSuccess,
  };
};
export const termsAndConditionsService = {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
  deleteTermsAndConditions,
};
