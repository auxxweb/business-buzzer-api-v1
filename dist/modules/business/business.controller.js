// import { FilterQuery } from 'mongoose'
import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
// import { getPaginationOptions } from '../../utils/pagination.utils.js'
import { businessService } from "./business.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
const businessSignUp = errorWrapper(async (req, res, next) => {
  const data = await businessService.businessSignUp({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const updateBusiness = errorWrapper(async (req, res, next) => {
  const data = await businessService.updateBusiness(req.user?._id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateBusinessByAdmin = errorWrapper(async (req, res, next) => {
  const data = await businessService.updateBusinessByAdmin(req.params.id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const businessLogin = errorWrapper(async (req, res, next) => {
  const data = await businessService.businessLogin({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getBusinessById = errorWrapper(async (req, res, next) => {
  const data = await businessService.getBusinessById(req.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getBusinessProfile = errorWrapper(async (req, res, next) => {
  const data = await businessService.getBusinessById(req.user?._id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateBusinessPassword = errorWrapper(async (req, res, next) => {
  const data = await businessService.updateBusinessPassword({
    businessId: req.user?._id,
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllBusiness = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  let query = {
    isDeleted: false,
    paymentStatus: true,
    status: true,
  };
  const searchTerm = req.query?.searchTerm;
  if (searchTerm) {
    query = {
      ...query,
      $or: [
        {
          businessName: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
      ],
    };
  }
  console.log(req.query?.lat, req.query?.lon, "lat-logn-loatt");
  const data = await businessService.getAllBusiness({
    query: {
      ...query,
      ...(req.query?.selectedPlan && {
        selectedPlan: new ObjectId(String(req.query?.selectedPlan)),
      }),
      ...(req.query?.category && {
        category: new ObjectId(String(req.query?.category)),
      }),
    },
    ...(req.query?.lat && {
      lat: Number(req.query?.lat),
    }),
    ...(req.query?.lon && {
      lon: Number(req.query?.lon),
    }),
    options: {
      ...paginationOptions,
      sort: { createdAt: -1 },
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getBusinessByCategory = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  let query = {
    isDeleted: false,
    category: new ObjectId(String(req.params?.id)),
  };
  const searchTerm = req.query?.searchTerm;
  if (searchTerm) {
    query = {
      ...query,
      $or: [
        {
          businessName: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
      ],
    };
  }
  const data = await businessService.getAllBusiness({
    query: {
      ...query,
    },
    ...(req.query?.lat && {
      lat: Number(req.query?.lat),
    }),
    ...(req.query?.lon && {
      lon: Number(req.query?.lon),
    }),
    options: {
      ...paginationOptions,
      sort: { createdAt: -1 },
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export {
  businessSignUp,
  businessLogin,
  getBusinessById,
  getAllBusiness,
  getBusinessByCategory,
  updateBusiness,
  updateBusinessByAdmin,
  getBusinessProfile,
  updateBusinessPassword,
};
