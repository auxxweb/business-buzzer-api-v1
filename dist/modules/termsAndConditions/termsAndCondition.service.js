import TermsAndCondition from "./termsAndConditions.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";
const getTermsAndConditions = async (businessId) => {
  const termsAndConditions = await TermsAndCondition.find({
    business: new ObjectId(businessId),
  });
  return termsAndConditions;
};
const createTermsAndConditions = async (businessId, data) => {
  const businessObjId = new ObjectId(businessId);
  const termsAndConditions = data?.termsAndConditions;
  const creationData = termsAndConditions.map((data) => {
    return {
      business: businessObjId,
      title: data.title,
      data: data.data,
    };
  });
  const createdData = await TermsAndCondition.insertMany(creationData);
  return createdData;
};
const updateTermsAndConditions = async (id, businessId, data) => {
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
  termsAndCondition.title = data?.title ? data.title : termsAndCondition.title;
  termsAndCondition.data = data?.data ? data.data : termsAndCondition.data;
  await termsAndCondition.save();
  return termsAndCondition;
};
const deleteTermsAndConditions = async (id, businessId) => {
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
