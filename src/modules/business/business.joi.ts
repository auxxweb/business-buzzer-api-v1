/* eslint-disable prefer-regex-literals */
import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi
    .string()
    .min(4)
    // .pattern(
    //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
    // )
    .required()
    .messages({
      "string.min": "Password must be at least 4 characters long",
      // "string.pattern.base":
      // "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password is a required field",
    }),
  firstName: joi.string().required().messages({
    "string.required": "FirstName is a required field",
  }),
  lastName: joi.string().required().messages({
    "string.required": "lastName is a required field",
  }),
  userName: joi.string().required().messages({
    "string.required": "UserName is a required field",
  }),
  // phoneNumber: joi.string().required().messages({
  //   "string.required": "PhoneNumber is a required field",
  // }),
  profileImage: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  coverImage: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
});
export const updateUserSchema = joi.object({
  password: joi
    .string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
    )
    .optional()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password must be a string",
    }),
  firstName: joi.string().optional().messages({
    "string.required": "FirstName must be a string",
  }),
  lastName: joi.string().optional().messages({
    "string.required": "lastName must be a string",
  }),
  userName: joi.string().optional().messages({
    "string.required": "UserName must be a string",
  }),
  phoneNumber: joi.string().optional().messages({
    "string.required": "PhoneNumber must be a string",
  }),
  profileImage: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  coverImage: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  savedPost: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  following: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  followingAuthor: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
  follower: joi.string().optional().messages({
    "string.base": "Profile image must be a string",
  }),
});

export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});
export const updateAdminSchema = joi.object({
  status: joi.string().required().messages({
    "any.required": "Status is a required field",
  }),
});
export const forGotPasswordLinkSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  role: joi.string().required().messages({
    "string.role": "Role must be a valid String",
    "any.required": "Role is a required field",
  }),
});
export const resetPasswordSchema = joi.object({
  resetId: joi.string().required().messages({
    "any.required": "ResetId is a required field",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});

export const adminSignUpSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi
    .string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password is a required field",
    }),
  name: joi.string().required().messages({
    "string.required": "Name is a required field",
  }),
});
