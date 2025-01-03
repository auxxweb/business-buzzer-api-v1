import PrivacyPolicy from "./privacyPolicies.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";
const getPrivacyPolicy = async (businessId) => {
  const privacyPolicies = await PrivacyPolicy.find({
    business: new ObjectId(businessId),
  });
  return privacyPolicies;
};
const createPrivacyPolicy = async (businessId, data) => {
  const businessObjId = new ObjectId(businessId);
  const privacyPolicies = data?.privacyPolicies;
  const creationData = privacyPolicies.map((data) => {
    return {
      business: businessObjId,
      title: data.title,
      data: data.data,
    };
  });
  const createdData = await PrivacyPolicy.insertMany(creationData);
  return createdData;
};
const updatePrivacyPolicy = async (id, businessId, data) => {
  const privacyPolicy = await PrivacyPolicy.findOne({
    _id: new ObjectId(id),
    business: new ObjectId(businessId),
  });
  if (privacyPolicy == null) {
    return await generateAPIError(errorMessages.privacyPolicyNotFound, 404);
  }
  privacyPolicy.title = data?.title ? data.title : privacyPolicy.title;
  privacyPolicy.data = data?.data ? data.data : privacyPolicy.data;
  await privacyPolicy.save();
  return privacyPolicy;
};
const deletePrivacyPolicy = async (id, businessId) => {
  const privacyPolicy = await PrivacyPolicy.findOne({
    _id: new ObjectId(id),
    business: new ObjectId(businessId),
  });
  if (privacyPolicy == null) {
    return await generateAPIError(errorMessages.privacyPolicyNotFound, 404);
  }
  await privacyPolicy.deleteOne();
  return {
    message: successMessages.deleteSuccess,
  };
};
export const privacyPolicyService = {
  getPrivacyPolicy,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
};
