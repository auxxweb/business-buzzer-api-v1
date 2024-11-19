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
const businessExists = errorWrapper(async (req, res, next) => {
  const data = await businessService.businessExists({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const forgotPassword = errorWrapper(async (req, res, next) => {
  const data = await businessService.forgotPassword(req.body?.email);
  return responseUtils.success(res, {
    data,
    status: 200,
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
const addProduct = errorWrapper(async (req, res, next) => {
  const data = await businessService.addProduct(req.user?._id, {
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
const updateBusinessStatusByAdmin = errorWrapper(async (req, res, next) => {
  console.log(req.body, "req body");
  const data = await businessService.updateBusinessStatusByAdmin(
    req.params.id,
    req.body?.status,
  );
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const deleteBusinessByAdmin = errorWrapper(async (req, res, next) => {
  console.log(req.body, "req body");
  const data = await businessService.deleteBusinessByAdmin(req?.params?.id);
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
  const data = await businessService.getBusinessById(req.user?._id, true);
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
const getBusinessDashboardData = errorWrapper(async (req, res, next) => {
  const data = await businessService.getBusinessDashboardData(req.user?._id);
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
    status: true,
    $or: [{ isFree: true }, { paymentStatus: true }],
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
const getAllBusinessForDropDown = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  let query = {
    isDeleted: false,
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
  const data = await businessService.getAllBusinessForDropDown({
    query: {
      ...query,
    },
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
const getAllBusinessByAdmin = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  let query = {
    isDeleted: false,
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
  const data = await businessService.getAllBusinessByAdmin({
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
    ...(req.query?.paymentStatus && {
      paymentStatus: Number(req.query?.paymentStatus),
    }),
    ...(req.query?.status && {
      status: Number(req.query?.status),
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
  updateBusinessStatusByAdmin,
  getBusinessProfile,
  updateBusinessPassword,
  getAllBusinessByAdmin,
  deleteBusinessByAdmin,
  businessExists,
  getAllBusinessForDropDown,
  getBusinessDashboardData,
  addProduct,
  forgotPassword,
};
