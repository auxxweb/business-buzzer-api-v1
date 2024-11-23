/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import bcrypt from "bcryptjs";
import { hashValue } from "../../modules/business/business.utils.js";
import Admin from "./admin.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { generateToken } from "../../utils/auth.utils.js";
import { UpdateData } from "./admin.interface.js";
import { ObjectId } from "../../constants/type.js";
import { adminResetLinkEmailTemplate, getUuid } from "../../utils/app.utils.js";
import { sendMailData } from "../../interface/app.interface.js";
import { sendEmail } from "../../utils/sendMail.js";

const createAdmin = async (adminData: any): Promise<any> => {
  const hashedPassword = await hashValue(adminData?.password ?? "", 10);

  const admin = await Admin.create({
    ...adminData,
    password: hashedPassword,
  });

  return {
    _id: admin?._id,
    name: admin?.name,
    email: admin?.email,
    image: admin?.image,
  };
};

const adminLogin = async ({ password, email }: any): Promise<any> => {
  const admin = await Admin.findOne({
    email,
    isDeleted: false,
  });

  if (admin === null) {
    return await generateAPIError(errorMessages.adminNotFound, 400);
  }

  const comparePassword = await bcrypt.compare(password, admin.password ?? "");

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  return {
    _id: admin?._id,
    name: admin?.name,
    email: admin?.email,
    image: admin?.image,
    token: await generateToken({
      id: String(admin?._id),
    }),
  };
};

const updatePassword = async (updateData: UpdateData): Promise<any> => {
  const admin = await Admin.findOne({
    _id: new ObjectId(updateData?.adminId),
    isDeleted: false,
  });

  if (admin === null) {
    return await generateAPIError(errorMessages.adminNotFound, 400);
  }

  const comparePassword = await bcrypt.compare(
    updateData?.oldPassword,
    admin.password ?? "",
  );

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  const hashedPassword = await hashValue(updateData?.newPassword ?? "", 10);

  return await Admin.findOneAndUpdate(
    {
      _id: new ObjectId(updateData?.adminId),
      isDeleted: false,
    },
    {
      password: hashedPassword,
    },
    {
      new: true,
    },
  );
};

const forgotPasswordAdmin = async (email: string): Promise<any> => {
  const admin = await Admin?.findOne({
    email: email?.toString(),
    isDeleted: false,
  });

  if (!admin) {
    return await generateAPIError(errorMessages.accountNotFound(email), 400);
  }

  try {
    const uuId = getUuid();

    await Admin.findOneAndUpdate(
      {
        email,
        isDeleted: false,
      },
      {
        resetId: uuId,
      },
    );

    const obj: sendMailData = {
      to: admin?.email,
      text: await adminResetLinkEmailTemplate({
        username: admin?.name ?? "",
        uuId,
      }),
      subject: "En-connect",
    };

    await sendEmail(obj);
    return { message: "Email sent successfully!" };
  } catch (error) {
    return await generateAPIError(errorMessages.emailSendFailed, 400);
  }
};

const resetPassword = async ({ resetId, password }: any): Promise<any> => {
  if (resetId) {
    const user = await Admin.findOne({ resetId, isDeleted: false }).select(
      "_id status",
    );

    if (!user) {
      return await generateAPIError(errorMessages.linkExpired, 400);
    }

    const hashedPassword = await hashValue(password, 10);

    await Admin.findByIdAndUpdate(user?._id, {
      password: hashedPassword,
      resetId: "",
    });

    return {
      message: "password reset successfully ",
    };
  }
};

export const adminService = {
  createAdmin,
  adminLogin,
  updatePassword,
  forgotPasswordAdmin,
  resetPassword,
};
