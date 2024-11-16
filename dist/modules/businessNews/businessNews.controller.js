import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
import { newsService } from "./businessNews.service.js";
const createNews = errorWrapper(async (req, res, next) => {
  const data = await newsService.createNews({
    ...req.body,
    businessId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getAllNews = errorWrapper(async (req, res, next) => {
  const query = {
    isDeleted: false,
    businessId: new ObjectId(req.user?._id),
  };
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  const data = await newsService.getAllNews({
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
const getAllNewsById = errorWrapper(async (req, res, next) => {
  const query = {
    isDeleted: false,
    businessId: new ObjectId(req.params?.id),
  };
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  const data = await newsService.getAllNews({
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
const deleteNews = errorWrapper(async (req, res, next) => {
  const data = await newsService.deleteNews({
    newsId: req.params?.id,
    businessId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateNews = errorWrapper(async (req, res, next) => {
  const data = await newsService.updateNews(req.params?.id, {
    ...req.body,
    businessId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createNews, deleteNews, getAllNews, getAllNewsById, updateNews };
