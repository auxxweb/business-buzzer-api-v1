import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import Category from "./category.model.js";
import { ObjectId } from "../../constants/type.js";
const createCategory = async (category) => {
  const categoryExists = await Category.findOne({
    name: category?.name,
    isDeleted: false,
  });
  if (categoryExists) {
    return await generateAPIError(errorMessages.categoryExists, 400);
  }
  return await Category.create({
    name: category?.name,
    ...(category?.image && {
      image: category?.image,
    }),
  });
};
const getCategoryById = async (categoryId) => {
  const categoryExists = await Category.findOne({
    _id: new ObjectId(categoryId),
    isDeleted: false,
  });
  if (!categoryExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }
  return categoryExists;
};
const getAllCategories = async ({ query, options }) => {
  const [data, totalCount] = await Promise.all([
    Category.find(query, {}, options),
    Category.countDocuments(query),
  ]);
  return { data, totalCount };
};
const updateCategory = async (categoryId, categoryData) => {
  const categoryExists = await Category.findOne({
    _id: new ObjectId(categoryId),
    isDeleted: false,
  });
  if (!categoryExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }
  return await Category.findOneAndUpdate(
    {
      _id: new ObjectId(categoryId),
      isDeleted: false,
    },
    {
      ...(categoryData?.name && {
        name: categoryData?.name,
      }),
      ...(categoryData?.image && {
        image: categoryData?.image,
      }),
      ...(categoryData?.isDeleted && {
        isDeleted: categoryData?.isDeleted,
      }),
    },
    {
      new: true,
    },
  );
};
export const categoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
};
