/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import bcrypt from "bcryptjs";

import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";
import { findRating, hashValue } from "./business.utils.js";
import { generateToken } from "../../utils/auth.utils.js";
import { CreateBusinessData, BusinessLoginData } from "./business.interface.js";
// import { ObjectId } from '../../constants/type.js'
import Business from "./business.model.js";
import { ObjectId } from "../../constants/type.js";
import { FilterQuery, PipelineStage, QueryOptions } from "mongoose";
import {
  createBusinessId,
  getInformEmailTemplate,
  getUuid,
  resetLinkEmailTemplate,
} from "../../utils/app.utils.js";
import { appConfig } from "../../config/appConfig.js";
import { paymentService } from "../../modules/payment/payment.service.js";
import { sendMailData } from "../../interface/app.interface.js";
import { sendEmail } from "../../utils/sendMail.js";
// import BusinessReview from 'modules/businessReviews/businessReviews.model.js'

const businessSignUp = async (userData: CreateBusinessData): Promise<any> => {
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
    secondaryTheme,
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
    isFree,
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
  const isFreee = String(selectedPlan) === String(appConfig.freePlanId);

  const business = await Business.create({
    businessName,
    logo,
    ownerName,
    email,
    address,
    businessId: await createBusinessId(),
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
    selectedPlan,
    secondaryTheme,
    landingPageHero,
    welcomePart,
    specialServices,
    productSection,
    service,
    testimonial,
    gallery,
    seoData,
    paymentStatus,
    isFree,
    isInFreeTrail: isFreee,
    password: hashedPassword,
  });

  let paymentId = null;

  if (isFree) {
    const paymentData = await paymentService.createPayment({
      plan: selectedPlan,
      business: String(business?._id),
    });
    paymentId = paymentData?._id;
    console.log(paymentData, "paymentData");
  }

  const obj: sendMailData = {
    to: business?.email,
    text: await getInformEmailTemplate({
      businessName: business?.businessName ?? "",
    }),
    subject: "Instant connect",
  };

  await sendEmail(obj);

  return {
    _id: business?._id,
    businessName: business?.businessName,
    logo: business?.logo,
    ownerName: business?.ownerName,
    email: business?.email,
    location: business?.location,
    businessId: business?.businessId,
    address: business?.address,
    contactDetails: business?.contactDetails,
    socialMediaLinks: business?.socialMediaLinks,
    category: business?.category,
    services: business?.services,
    businessTiming: business?.businessTiming,
    description: business?.description,
    theme: business?.theme,
    secondaryTheme: business?.secondaryTheme,
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
    isFree: business?.isFree,
    ...(paymentId && {
      paymentId,
    }),
    rating: await findRating(business?.testimonial?.reviews),
    token: await generateToken({
      id: String(business?._id),
    }),
  };
};

const businessLogin = async (userData: BusinessLoginData): Promise<any> => {
  const { email, password } = userData;

  const business: any = await Business.findOne({
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
    businessId: business?.businessId,
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
    isFree: business?.isFree,
    rating: await findRating(business?.testimonial?.reviews),
    token: await generateToken({
      id: String(business?._id),
    }),
  };
};

const getBusinessById = async (
  businessId: string,
  isAuth?: boolean,
): Promise<any> => {
  // Convert businessId to ObjectId (Mongoose handles it automatically if needed)

  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
    ...(!isAuth && {
      $or: [{ isFree: true }, { paymentStatus: true }, { isInFreeTrail: true }],
    }),
  })
    .populate("selectedPlan category")
    .select("-password");

  if (!business) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  // Check business status and paymentStatus
  if (!business.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 404);
  }

  if (!isAuth) {
    if (
      !business?.paymentStatus &&
      !business?.isFree &&
      !business?.isInFreeTrail
    ) {
      return await generateAPIError(errorMessages.paymentNotCompleted, 400);
    }

    // if (!business?.paymentStatus && !business?.isFree&&!business?.isInFreeTrail) {
    //   return await generateAPIError(errorMessages.freePlanExired, 400)
    // }
  }

  // Calculate rating from testimonials
  const reviews = business?.testimonial?.reviews || [];
  business.rating = await findRating(reviews);

  console.log(business.rating, "ratings");

  return business;
};

const getAllBusiness = async ({
  query,
  options,
  lat,
  lon,
}: {
  query: FilterQuery<typeof Business>;
  options: QueryOptions;
  lat?: number;
  lon?: number;
}): Promise<any> => {
  const aggregatePipeLine: PipelineStage[] = [
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
      $lookup: {
        from: "payments",
        let: { businessId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$business", "$$businessId"],
              },
            },
          },
          { $sort: { createdAt: -1 } }, // Sort by `createdAt` in descending order to get the latest document first
          { $limit: 1 }, // Limit to only one document
        ],
        as: "payment",
      },
    },
    {
      $unwind: {
        path: "$payment",
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
        businessId: 1,
        address: 1,
        rating: 1,
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
        payment: 1,
        status: 1,
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

  const data = await Business.aggregate(aggregatePipeLine);

  // Loop through each business and calculate the rating

  return {
    data: data[0]?.data,
    totalCount: data[0]?.metadata[0]?.total || 0,
  };
};
const getAllBusinessByAdmin = async ({
  query,
  options,
  lat,
  lon,
}: {
  query: FilterQuery<typeof Business>;
  options: QueryOptions;
  lat?: number;
  lon?: number;
}): Promise<any> => {
  const aggregatePipeLine: PipelineStage[] = [
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
      $lookup: {
        from: "payments",
        let: { businessId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$business", "$$businessId"],
              },
            },
          },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
          {
            $addFields: {
              status: {
                $cond: [
                  { $lt: ["$expiryDate", new Date()] },
                  "expired",
                  {
                    $cond: [
                      { $eq: ["$paymentStatus", false] },
                      "payment failed",
                      "active",
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "payment",
      },
    },

    {
      $unwind: {
        path: "$payment",
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
        businessId: 1,
        address: 1,
        "category.name": 1,
        theme: 1,
        "selectedPlan.plan": 1,
        status: 1,
        payment: 1,
        createdAt: 1,
        isFree: 1,
        isInFreeTrail: 1,
        isFreeTrailUsed: 1,
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

  const data = await Business.aggregate(aggregatePipeLine);

  // Loop through each business and calculate the rating
  const businessesWithRating = await Promise.all(
    data[0]?.data?.map(async (business: any) => {
      const reviews = business?.testimonial?.reviews || [];
      business.rating = await findRating(reviews);
      return business;
    }),
  );

  return {
    data: businessesWithRating,
    totalCount: data[0]?.metadata[0]?.total || 0,
  };
};

const updateBusiness = async (
  businessId: string,
  businessData: Partial<CreateBusinessData>,
): Promise<any> => {
  const {
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
    secondaryTheme,
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
    location,
  } = businessData;
  console.log();

  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  if (email) {
    const emailExists = await Business.findOne({
      $and: [{ email }, { email: { $ne: email } }],
      status: true,
      isDeleted: false,
    });

    if (!emailExists) {
      return await generateAPIError(errorMessages.userExists, 400);
    }
  }

  const updatedBusiness: any = await Business.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      ...(businessName && {
        businessName,
      }),
      ...(logo && {
        logo,
      }),
      ...(ownerName && {
        ownerName,
      }),
      ...(email && {
        email,
      }),
      ...(address && {
        address,
      }),
      ...(contactDetails && {
        contactDetails,
      }),
      ...(socialMediaLinks && {
        socialMediaLinks,
      }),
      ...(category && {
        category,
      }),
      ...(services && {
        services,
      }),
      ...(businessTiming && {
        businessTiming,
      }),
      ...(description && {
        description,
      }),
      ...(theme && {
        theme,
      }),
      ...(secondaryTheme && {
        secondaryTheme,
      }),
      ...(landingPageHero && {
        landingPageHero,
      }),
      ...(welcomePart && {
        welcomePart,
      }),
      ...(specialServices && {
        specialServices,
      }),
      ...(productSection && {
        productSection,
      }),
      ...(service && {
        service,
      }),
      ...(testimonial && {
        testimonial,
      }),
      ...(gallery && {
        gallery,
      }),
      ...(seoData && {
        seoData,
      }),
      ...(selectedPlan && {
        selectedPlan,
      }),
      ...(location?.lat &&
        location?.lon && {
          location: {
            type: "Point",
            coordinates: [location?.lon, location?.lat],
          },
        }),
    },
    {
      new: true,
    },
  );

  const reviews = updatedBusiness?.testimonial?.reviews || [];
  updatedBusiness.rating = await findRating(reviews);

  return updatedBusiness;
};

const deleteBusinessByAdmin = async (businessId: string): Promise<any> => {
  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  return await Business.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
};
const updateBusinessByAdmin = async (
  businessId: string,
  businessData: Partial<
    CreateBusinessData & { isFree: boolean; status: boolean }
  >,
): Promise<any> => {
  const {
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
    location,
    password,
    paymentStatus,
    status,
    isFree,
    secondaryTheme,
  } = businessData;
  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }
  let hashedPassword;
  let comparePassword;

  if (password) {
    comparePassword = await bcrypt.compare(password, business.password ?? "");
    hashedPassword = await hashValue(password, 10);
  }

  const updatedBusiness: any = await Business.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      ...(businessName && {
        businessName,
      }),
      ...(logo && {
        logo,
      }),
      ...(ownerName && {
        ownerName,
      }),
      ...(email && {
        email,
      }),
      ...(address && {
        address,
      }),
      ...(contactDetails && {
        contactDetails,
      }),
      ...(socialMediaLinks && {
        socialMediaLinks,
      }),
      ...(category && {
        category,
      }),
      ...(services && {
        services,
      }),
      ...(businessTiming && {
        businessTiming,
      }),
      ...(description && {
        description,
      }),
      ...(theme && {
        theme,
      }),
      ...(secondaryTheme && {
        secondaryTheme,
      }),
      ...(landingPageHero && {
        landingPageHero,
      }),
      ...(welcomePart && {
        welcomePart,
      }),
      ...(isFree && {
        isFree,
      }),
      ...(specialServices && {
        specialServices,
      }),
      ...(productSection && {
        productSection,
      }),
      ...(service && {
        service,
      }),
      ...(testimonial && {
        testimonial,
      }),
      ...(gallery && {
        gallery,
      }),
      ...(seoData && {
        seoData,
      }),
      ...(selectedPlan && {
        selectedPlan,
      }),
      ...(paymentStatus && {
        paymentStatus,
      }),
      ...(status && {
        status,
      }),
      ...(password &&
        !comparePassword && {
          password: hashedPassword,
        }),
      ...(location?.lat &&
        location?.lon && {
          location: {
            type: "Point",
            coordinates: [location?.lon, location?.lat],
          },
        }),
    },
    {
      new: true,
    },
  );

  const reviews = updatedBusiness?.testimonial?.reviews || [];
  updatedBusiness.rating = await findRating(reviews);

  return updatedBusiness;
};

const updateBusinessStatusByAdmin = async (
  businessId: string,
  status: string,
): Promise<any> => {
  const business = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  }).select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  await Business.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      status: !business?.status,
    },
  );

  return {
    message: successMessages.statusUpdated,
  };
};
const updateBusinessIsFreeByAdmin = async (
  businessId: string,
  isFree: string,
): Promise<any> => {
  const business = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  }).select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  await Business.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: false,
    },
    {
      isFree: !business?.isFree,
    },
  );

  return {
    message: successMessages.statusUpdated,
  };
};

const updateBusinessPassword = async ({
  oldPassword,
  newPassword,
  businessId,
}: {
  oldPassword: string;
  newPassword: string;
  businessId: string;
}): Promise<any> => {
  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  });

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  if (!business?.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  const comparePassword = await bcrypt.compare(
    oldPassword,
    business.password ?? "",
  );

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  const hashedPassword = await hashValue(newPassword, 10);

  try {
    await Business.findOneAndUpdate(
      {
        _id: new ObjectId(businessId),
        isDeleted: false,
      },
      {
        password: hashedPassword,
      },
    );

    return {
      message: successMessages.passwordUpdated,
    };
  } catch (error) {
    return await generateAPIError(errorMessages.passwordNotUpdated, 400);
  }
};

const businessExists = async (businessData: {
  email: string;
  password: string;
}): Promise<any> => {
  const business = await Business.findOne({
    email: businessData?.email,
    isDeleted: false,
  });

  if (business) {
    return await generateAPIError(errorMessages.businessExists, 400);
  }

  return true;
};
const getAllBusinessForDropDown = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Business>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Business.find(query, { _id: 1, businessName: 1 }, options),
    Business.countDocuments(query),
  ]);

  return { data, totalCount };
};

const getBusinessDashboardData = async (businessId: string): Promise<any> => {
  const business: any = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  const businessSummary = await Business.aggregate([
    {
      $match: {
        _id: new ObjectId(businessId),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "business_reviews",
        let: { businessId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$businessId", "$$businessId"] },
                  { $eq: ["$isDeleted", false] },
                ],
              },
            },
          },
        ],
        as: "reviews",
      },
    },
    {
      $lookup: {
        from: "contact_forms",
        let: { businessId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$business", "$$businessId"] },
                  { $eq: ["$isDeleted", false] },
                ],
              },
            },
          },
        ],
        as: "leads",
      },
    },
    {
      $project: {
        businessName: 1,
        totalLeads: { $size: "$leads" }, // Count of `contact_forms` with `isDelete: false`
        totalServiceCount: {
          $add: [
            { $size: { $ifNull: ["$services", []] } },
            { $size: { $ifNull: ["$specialServices.data", []] } },
          ],
        }, // Combined total of `services` and `specialServices.data`
        totalReviews: { $size: "$reviews" }, // Count of `business_reviews` with `isDelete: false`
        averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] }, // Sets `averageRating` to 0 if no reviews
      },
    },
  ]);

  return businessSummary[0];
};

const addProduct = async (
  businessId: string,
  productData: {
    title: string;
    description: string;
    price?: number | string; // Optional and allow string for validation
    image?: string | null; // Optional and allow null for validation
  },
): Promise<any> => {
  const business = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  });

  if (!business) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  // Validate and sanitize product data, add unique _id for the new product
  const sanitizedProductData = {
    _id: new ObjectId(), // Generate a new ObjectId for the product
    title: productData.title,
    description: productData.description,
    price:
      typeof productData.price === "number" && !isNaN(productData.price)
        ? productData.price
        : typeof productData.price === "string"
        ? Number(productData.price)
        : 0,
    image: productData.image || "", // Default to empty string if null or undefined
  };

  try {
    const data = await Business.findOneAndUpdate(
      { _id: new ObjectId(businessId), isDeleted: false },
      { $push: { productSection: sanitizedProductData } },
      { new: true }, // Returns the updated document with the new product's _id
    );

    return data?._id;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw to handle in higher-level error handling
  }
};

const forgotPassword = async (email: string): Promise<any> => {
  const business = await Business?.findOne({
    email: email?.toString(),
    isDeleted: false,
    status: true,
  });

  if (!business) {
    return await generateAPIError(errorMessages.accountNotFound(email), 400);
  }

  if (!business?.status) {
    return await generateAPIError(errorMessages.userAccountBlocked, 400);
  }
  try {
    const uuId = getUuid();

    await Business.findOneAndUpdate(
      {
        email,
        isDeleted: false,
      },
      {
        resetId: uuId,
      },
    );

    const obj: sendMailData = {
      to: business?.email,
      text: await resetLinkEmailTemplate({
        username: business?.businessName ?? "",
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

// const resetPassword = async ({resetId:string,password:string}:{}):Promise<any>=>{

// }

const updatePassword = async ({ resetId, password }: any): Promise<any> => {
  if (resetId) {
    const user = await Business.findOne({ resetId, isDeleted: false }).select(
      "_id status",
    );

    if (!user) {
      return await generateAPIError(errorMessages.linkExpired, 400);
    }

    if (!user?.status) {
      return await generateAPIError(errorMessages.userAccountBlocked, 400);
    }

    const hashedPassword = await hashValue(password, 10);

    await Business.findByIdAndUpdate(user?._id, {
      password: hashedPassword,
      resetId: "",
    });

    return {
      message: "password reset successfully ",
    };
  }
};

export const businessService = {
  businessLogin,
  businessSignUp,
  getBusinessById,
  getAllBusiness,
  updateBusiness,
  updateBusinessByAdmin,
  updateBusinessStatusByAdmin,
  updateBusinessPassword,
  getAllBusinessByAdmin,
  deleteBusinessByAdmin,
  businessExists,
  getAllBusinessForDropDown,
  getBusinessDashboardData,
  addProduct,
  forgotPassword,
  updatePassword,
  updateBusinessIsFreeByAdmin,
};
