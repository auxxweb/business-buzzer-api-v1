import Joi from "joi";

// Joi validation schema for FreeList
export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is a required field",
  }),
  brandName: Joi.number().required().messages({
    "number.base": "Brand Name must be a number",
    "any.required": "Brand Name is a required field",
  }),
  logo: Joi.string().optional().messages({
    "string.base": "Logo must be a valid string",
  }),
  address: Joi.object({
    buildingName: Joi.string().optional(),
    streetName: Joi.string().optional(),
    landMark: Joi.string().optional(),
    district: Joi.string().optional(),
    state: Joi.string().optional(),
    pinCode: Joi.number().optional(),
  }).optional(),
  contactDetails: Joi.object({
    primaryNumber: Joi.number().optional(),
    secondaryNumber: Joi.number().optional(),
    whatsAppNumber: Joi.number().optional(),
    primaryCountryCode: Joi.number().optional(),
    secondaryCountryCode: Joi.number().optional(),
    whatsappCountryCode: Joi.number().optional(),
    email: Joi.string().email().optional().messages({
      "string.email": "Email must be a valid email address",
    }),
    website: Joi.string().uri().optional().messages({
      "string.uri": "Website must be a valid URL",
    }),
  }).optional(),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  enconnectUrl: Joi.string().uri().optional().messages({
    "string.uri": "Enconnect URL must be a valid URL",
  }),
  images: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Images must be an array of strings",
  }),
});
