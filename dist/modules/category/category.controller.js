import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { categoryService } from "./category.service.js";
const createCategory = errorWrapper(async (req, res, next) => {
  const data = await categoryService.createCategory({
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getAllCategories = errorWrapper(async (req, res, next) => {
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
          name: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
      ],
    };
  }
  const data = await categoryService.getAllCategories({
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
const updateCategory = errorWrapper(async (req, res, next) => {
  const data = await categoryService.updateCategory(req.params.id, {
    ...req.body,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getCategoryById = errorWrapper(async (req, res, next) => {
  const data = await categoryService.getCategoryById(req.params.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createCategory, getAllCategories, updateCategory, getCategoryById };
