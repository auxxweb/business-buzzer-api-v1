import { generateAPIError } from "../../errors/apiError.js";
import Business from "../../modules/business/business.model.js";
import { errorMessages } from "../../constants/messages.js";
import { ObjectId } from "../../constants/type.js";
import ContactForm from "./contactForm.model.js";
import AdminNewsLetter from "./adminNewsLetter.model.js";
import { FilterQuery, QueryOptions } from "mongoose";

const submitContactForm = async (data: any): Promise<any> => {
  const business: any = await Business.findById(
    new ObjectId(data?.businessId),
  ).select("_id");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  const createdFormData = await ContactForm.create({
    business: new ObjectId(business._id),
    name: data?.name,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    message: data?.message,
  });

  return createdFormData;
};
const submitAdminNewsLetter = async (data: any): Promise<any> => {
  const newsLetter = await AdminNewsLetter.create({
    email: data?.email,
  });

  return newsLetter;
};

const getContactFormsByBusiness = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof ContactForm>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    ContactForm.find(query, {}, options),
    ContactForm.countDocuments(query),
  ]);

  return { data, totalCount };
};

export const contactFormService = {
  submitContactForm,
  getContactFormsByBusiness,
  submitAdminNewsLetter,
};
