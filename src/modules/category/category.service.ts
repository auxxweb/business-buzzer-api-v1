import { FilterQuery, QueryOptions } from "mongoose";
import { errorMessages } from "../../constants/messages.js";
import { generateAPIError } from "../../errors/apiError.js";
import { CreateCategoryData } from "./category.interface.js";
import Category from "./category.model.js";
import { ObjectId } from "../../constants/type.js";
import { checkAnyActiveBusinesses } from "./category.utils.js";

const createCategory = async (category: CreateCategoryData): Promise<any> => {
  const categoryExists = await Category.findOne({
    name: category?.name?.trim().toLowerCase(),
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
    ...(category?.coverImage && {
      coverImage: category?.coverImage,
    }),
  });
};

const getCategoryById = async (categoryId: string): Promise<any> => {
  const categoryExists = await Category.findOne({
    _id: new ObjectId(categoryId),
    isDeleted: false,
  });

  if (!categoryExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }

  return categoryExists;
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
const getAllCategoriesForDropDown = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Category>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Category.find(query, { _id: 1, name: 1 }, options),
    Category.countDocuments(query),
  ]);

  return { data, totalCount };
};

const updateCategory = async (
  categoryId: string,
  categoryData: any,
): Promise<any> => {
  const categoryExists = await Category.findOne({
    _id: new ObjectId(categoryId),
    isDeleted: false,
  });

  if (!categoryExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }

  if (categoryData?.name && categoryExists?.name !== categoryData?.name) {
    const catNameExists = await Category.findOne({
      _id: {
        $ne: new ObjectId(categoryId),
      },
      name: {
        $regex: new RegExp(String(categoryData?.name)),
        $options: "i",
      },
      isDeleted: false,
    });
    if (catNameExists) {
      return await generateAPIError(
        errorMessages.categoryNameExists(categoryData?.name),
        400,
      );
    }
  }

  if (categoryData?.isDeleted === true || categoryData?.isDeleted === "true") {
    const isBusinessExists = await checkAnyActiveBusinesses(categoryId);
    console.log(isBusinessExists, "isbusinessExists");

    if (isBusinessExists > 0) {
      return await generateAPIError(
        errorMessages.businessExistsInCategory(
          isBusinessExists,
          categoryExists?.name,
        ),
        400,
      );
    }
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
      ...(categoryData?.coverImage && {
        coverImage: categoryData?.coverImage,
      }),
      ...(categoryData?.isDeleted && {
        isDeleted: true,
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
  getAllCategoriesForDropDown,
};
