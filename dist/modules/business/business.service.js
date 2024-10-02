import bcrypt from "bcryptjs";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { hashValue } from "./business.utils.js";
import { generateToken } from "../../utils/auth.utils.js";
// import { ObjectId } from '../../constants/type.js'
import Business from "./business.model.js";
import { ObjectId } from "../../constants/type.js";
const businessSignUp = async (userData) => {
    const { businessName, logo, ownerName, email, password, address, contactDetails, socialMediaLinks, category, services, businessTiming, description, theme, landingPageHero, welcomePart, specialServices, productSection, service, testimonial, gallery, seoData, selectedPlan, paymentStatus, } = userData;
    const businessExists = await Business.findOne({
        email,
        isDeleted: false,
    });
    console.log(businessExists, "user", userData);
    if (businessExists != null) {
        return await generateAPIError(errorMessages.userExists, 400);
    }
    const hashedPassword = await hashValue(password, 10);
    const business = await Business.create({
        businessName,
        logo,
        ownerName,
        email,
        address,
        contactDetails,
        socialMediaLinks,
        category,
        services,
        businessTiming,
        description,
        theme,
        landingPageHero,
        welcomePart,
        specialServices,
        productSection,
        service,
        testimonial,
        gallery,
        seoData,
        selectedPlan,
        paymentStatus,
        password: hashedPassword,
    });
    return {
        _id: business?._id,
        businessName: business?.businessName,
        logo: business?.logo,
        ownerName: business?.ownerName,
        email: business?.email,
        address: business?.address,
        contactDetails: business?.contactDetails,
        socialMediaLinks: business?.socialMediaLinks,
        category: business?.category,
        services: business?.services,
        businessTiming: business?.businessTiming,
        description: business?.description,
        theme: business?.theme,
        landingPageHero: business?.landingPageHero,
        welcomePart: business?.welcomePart,
        specialServices: business?.specialServices,
        productSection: business?.productSection,
        service: business?.service,
        testimonial: business?.testimonial,
        gallery: business?.gallery,
        seoData: business?.seoData,
        selectedPlan: business?.selectedPlan,
        paymentStatus: business?.paymentStatus,
        token: await generateToken({
            id: String(business?._id),
        }),
    };
};
const businessLogin = async (userData) => {
    const { email, password } = userData;
    const business = await Business.findOne({
        email,
        isDeleted: false,
    });
    if (business == null) {
        return await generateAPIError(errorMessages.userNotFound, 404);
    }
    if (!business?.status) {
        return await generateAPIError(errorMessages.userAccountBlocked, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
    }
    // if (user?.role !== UserRole.USER) {
    //   return await generateAPIError(errorMessages.unauthorized, 401);
    // }
    const comparePassword = await bcrypt.compare(password, business.password ?? "");
    if (!comparePassword) {
        return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
    }
    return {
        _id: business?._id,
        businessName: business?.businessName,
        logo: business?.logo,
        ownerName: business?.ownerName,
        email: business?.email,
        address: business?.address,
        contactDetails: business?.contactDetails,
        socialMediaLinks: business?.socialMediaLinks,
        category: business?.category,
        services: business?.services,
        businessTiming: business?.businessTiming,
        description: business?.description,
        theme: business?.theme,
        landingPageHero: business?.landingPageHero,
        welcomePart: business?.welcomePart,
        specialServices: business?.specialServices,
        productSection: business?.productSection,
        service: business?.service,
        testimonial: business?.testimonial,
        gallery: business?.gallery,
        seoData: business?.seoData,
        selectedPlan: business?.selectedPlan,
        paymentStatus: business?.paymentStatus,
        token: await generateToken({
            id: String(business?._id),
        }),
    };
};
const getBusinessById = async (businessId) => {
    const business = await Business.findOne({
        _id: new ObjectId(businessId),
        isDeleted: false,
    })
        .populate("selectedPlan")
        .select("-password");
    if (business == null) {
        return await generateAPIError(errorMessages.userNotFound, 404);
    }
    if (!business?.status) {
        return await generateAPIError(errorMessages.userAccountBlocked, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
    }
    return business;
};
export const businessService = {
    businessLogin,
    businessSignUp,
    getBusinessById,
};
