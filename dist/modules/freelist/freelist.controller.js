import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { freeListService } from "./freelist.service.js";
const freeListSignUp = errorWrapper(async (req, res, next) => {
  const data = await freeListService.freeListSignup({
    ...req.body,
  });
  console.log(req.body, "body daataaa");
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const freeListLogin = errorWrapper(async (req, res, next) => {
  const data = await freeListService.freelistLogin({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateFreeList = errorWrapper(async (req, res, next) => {
  // console.log(req.params.id, "ssasaasasas");
  const data = await freeListService.updateFreeList(req?.params?.id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllFreelistMain = errorWrapper(async (req, res, next) => {
  console.log(req.query, "query data");
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
  // Fetch data using the service
  const data = await freeListService.getAllFreelistMain({
    query: {
      page: Number(page),
      limit: Number(limit),
    },
  });
  // Return the response
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllFreelist = errorWrapper(async (req, res, next) => {
  // Directly call the service to fetch all freelist documents
  console.log(req.query, "query dataaaa");
  const data = await freeListService.getAllFreelist();
  // Return the response
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const deleteBusinessByAdmin = errorWrapper(async (req, res, next) => {
  console.log(req?.params?.id, "req body");
  const data = await freeListService.deleteBusinessByAdmin(req?.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const unDeleteBusinessByAdmin = errorWrapper(async (req, res, next) => {
  console.log(req.params.id, "hasasasreq body");
  const data = await freeListService.unDeleteBusinessByAdmin(req?.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getTrashBusiness = errorWrapper(async (req, res, next) => {
  const data = await freeListService.getAllTrashFreelist();
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export {
  freeListSignUp,
  getAllFreelist,
  deleteBusinessByAdmin,
  unDeleteBusinessByAdmin,
  getTrashBusiness,
  getAllFreelistMain,
  freeListLogin,
  updateFreeList,
};
