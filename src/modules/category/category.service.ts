import { FilterQuery, QueryOptions } from "mongoose";
import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import { CreateCategoryData } from "./category.interface.js";
import Category from "./category.model.js";

const createCategory = async (category: CreateCategoryData): Promise<any> => {
  const categoryExists = await Category.findOne({
    name: category?.name,
    isDeleted: false,
  });

  if (categoryExists) {
    return await generateAPIError(errorMessages.planExists, 400);
  }

  return await Category.create({
    name: category?.name,
    ...(category?.image && {
      image: category?.image,
    }),
  });
};

const getAllCategories = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Category>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Category.find(query, {}, options),
    Category.countDocuments(query),
  ]);

  return { data, totalCount };
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
