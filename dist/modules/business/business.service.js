/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import bcrypt from "bcryptjs";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { hashValue } from "./business.utils.js";
import { generateToken } from "../../utils/auth.utils.js";
// import { ObjectId } from '../../constants/type.js'
import Business from "./business.model.js";
import { ObjectId } from "../../constants/type.js";
const businessSignUp = async (userData) => {
  const {
    businessName,
    logo,
    ownerName,
    email,
    password,
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
    location,
  } = userData;
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
    ...(location?.lat &&
      location?.lon && {
        location: {
          type: "Point",
          coordinates: [location?.lon, location?.lat],
        },
      }),
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
    location: business?.location,
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
  const comparePassword = await bcrypt.compare(
    password,
    business.password ?? "",
  );
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
    location: business?.location,
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
    .populate("selectedPlan category")
    .select("-password");
  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }
  if (!business?.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }
  return business;
};
const getAllBusiness = async ({ query, options, lat, lon }) => {
  const aggregatePipeLine = [
    {
      $match: query,
    },
    {
      $lookup: {
        from: "plans",
        localField: "selectedPlan",
        foreignField: "_id",
        as: "selectedPlan",
      },
    },
    {
      $unwind: {
        path: "$selectedPlan",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        businessName: 1,
        logo: 1,
        ownerName: 1,
        email: 1,
        address: 1,
        contactDetails: 1,
        socialMediaLinks: 1,
        category: 1,
        services: 1,
        businessTiming: 1,
        description: 1,
        theme: 1,
        landingPageHero: 1,
        welcomePart: 1,
        specialServices: 1,
        productSection: 1,
        service: 1,
        testimonial: 1,
        gallery: 1,
        seoData: 1,
        location: 1,
        selectedPlan: 1,
        paymentStatus: 1,
      },
    },
    {
      $sort: options?.sort,
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: options?.skip || 0 }, { $limit: options?.limit || 10 }],
      },
    },
  ];
  if (lat && lon) {
    aggregatePipeLine.unshift({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lon, lat],
        },
        distanceField: "distanceField",
        maxDistance: 6000,
        spherical: true,
      },
    });
  }
  console.log(lat, lon, "lat-lon");
  const data = await Business.aggregate(aggregatePipeLine);
  return {
    data: data[0]?.data,
    totalCount: data[0]?.metadata[0]?.total || 0,
  };
};
export const businessService = {
  businessLogin,
  businessSignUp,
  getBusinessById,
  getAllBusiness,
};
