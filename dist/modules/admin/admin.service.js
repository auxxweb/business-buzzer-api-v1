/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import bcrypt from "bcryptjs";
import { hashValue } from "../../modules/business/business.utils.js";
import Admin from "./admin.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { generateToken } from "../../utils/auth.utils.js";
import { ObjectId } from "../../constants/type.js";
const createAdmin = async (adminData) => {
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
const adminLogin = async ({ password, email }) => {
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
const updatePassword = async (updateData) => {
    const admin = await Admin.findOne({
        _id: new ObjectId(updateData?.adminId),
        isDeleted: false,
    });
    if (admin === null) {
        return await generateAPIError(errorMessages.adminNotFound, 400);
    }
    const comparePassword = await bcrypt.compare(updateData?.oldPassword, admin.password ?? "");
    if (!comparePassword) {
        return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
    }
    const hashedPassword = await hashValue(updateData?.newPassword ?? "", 10);
    return await Admin.findOneAndUpdate({
        _id: new ObjectId(updateData?.adminId),
        isDeleted: false,
    }, {
        password: hashedPassword,
    }, {
        new: true,
    });
};
export const adminService = {
    createAdmin,
    adminLogin,
    updatePassword,
};
