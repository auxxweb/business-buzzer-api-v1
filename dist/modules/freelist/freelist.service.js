import bcrypt from "bcryptjs";
import FreeList from "./freelist.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { ObjectId } from "../../constants/type.js";
import { hashValue } from "../../modules/business/business.utils.js";
import { generateToken } from "../../utils/auth.utils.js";
const freeListSignup = async (userData) => {
  try {
    const {
      name,
      brandName,
      logo,
      address,
      contactDetails,
      description,
      enconnectUrl,
      images,
      password,
      category,
    } = userData;
    const freeListExists = await FreeList.findOne({
      "contactDetails.email": contactDetails?.email ?? "",
      isDeleted: false,
    });
    if (freeListExists != null) {
      return await generateAPIError("Email already exists", 400);
    }
    const hashedPassword = await hashValue(password ?? "", 10);
    const freelist = await FreeList.create({
      name,
      brandName,
      logo,
      address,
      contactDetails,
      description,
      enconnectUrl,
      images,
      category,
      password: hashedPassword,
    });
    return {
      _id: freelist?._id,
      name: freelist?.name,
      brandName: freelist?.brandName,
      logo: freelist?.logo,
      address: freelist?.address,
      contactDetails: freelist?.contactDetails,
      description: freelist?.description,
      enconnectUrl: freelist?.enconnectUrl,
      images: freelist?.images,
      catetory: freelist?.category,
    };
  } catch (error) {
    console.error(error);
  }
};
const freelistLogin = async ({ email = "", password = "" }) => {
  // Find the freeList and populate the category field
  const freeList = await FreeList.findOne({
    isDeleted: false,
    "contactDetails.email": email.trim(),
  }).populate("category", "name"); // Populate the 'category' field with 'name' and '_id'
  if (freeList == null) {
    return await generateAPIError(errorMessages.freeListNotFound, 400);
  }
  const comparePassword = await bcrypt.compare(
    password,
    freeList?.password ?? "",
  );
  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 400);
  }
  return {
    token: await generateToken({
      id: String(freeList?._id),
    }),
    _id: freeList?._id,
    name: freeList?.name,
    brandName: freeList?.brandName,
    logo: freeList?.logo,
    address: freeList?.address,
    contactDetails: freeList?.contactDetails,
    description: freeList?.description,
    enconnectUrl: freeList?.enconnectUrl,
    images: freeList?.images,
    category: freeList?.category, // Now populated, should have 'name' and '_id'
  };
};
const updateFreeList = async (freeListId, updateData) => {
  const freeList = await FreeList.findOne({
    isDeleted: false,
    _id: new ObjectId(freeListId),
  });
  if (freeList == null) {
    return await generateAPIError(errorMessages.freeListNotFound, 400);
  }
  const email = updateData?.contactDetails?.email;
  if (email != null && freeList?.contactDetails?.email !== email) {
    const freeListEmailExists = await FreeList.findOne({
      "contactDetails.email": email,
      isDeleted: false,
    });
    if (freeListEmailExists != null) {
      return await generateAPIError(
        "Email already used on another profile",
        400,
      );
    }
  }
  return await FreeList.findOneAndUpdate(
    {
      isDeleted: false,
      _id: new ObjectId(freeListId),
    },
    {
      ...(updateData?.name !== null && {
        name: updateData?.name,
      }),
      ...(updateData?.brandName !== null && {
        brandName: updateData?.brandName,
      }),
      ...(updateData?.logo !== null && {
        logo: updateData?.logo,
      }),
      ...(updateData?.address !== null && {
        address: updateData?.address,
      }),
      ...(updateData?.contactDetails !== null && {
        contactDetails: updateData?.contactDetails,
      }),
      ...(updateData?.description !== null && {
        description: updateData?.description,
      }),
      ...(updateData?.enconnectUrl !== null && {
        enconnectUrl: updateData?.enconnectUrl,
      }),
      ...(updateData?.images !== null && {
        images: updateData?.images,
      }),
      ...(updateData?.category !== null && {
        category: updateData?.category,
      }),
    },
  );
};
// Adjust the path based on your file structure
const getAllFreelistMain = async ({ query }) => {
  try {
    const { page, limit } = query;
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    const totalData = await FreeList.countDocuments({
      isDeleted: false,
    });
    // Fetch documents with pagination and filter out isDeleted items
    const data = await FreeList.aggregate([
      {
        $match: { isDeleted: { $ne: true } },
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
          preserveNullAndEmptyArrays: true, // Keeps items even if they have no category
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          brandName: 1,
          categoryName: "$category.name",
          categoryId: "$category._id",
          contactDetails: 1,
          address: 1,
          logo: 1,
          description: 1,
          enconnectUrl: 1,
          images: 1,
          // Keeping category ID if needed
        },
      },
    ])
      .skip(skip)
      .limit(limit)
      .exec();
    // console.log(data, "freeelistdataaa");
    // Return the fetched data
    return { totalCount: totalData, data };
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error?.message}`);
  }
};
const getAllFreelist = async () => {
  try {
    // Fetch all documents from the 'FreeList' collection
    const data = await FreeList.find({ isDeleted: { $ne: true } }).lean();
    return data;
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error.message}`);
  }
};
const getAllTrashFreelist = async () => {
  try {
    // Fetch all documents from the 'FreeList' collection
    const data = await FreeList.find({ isDeleted: { $ne: false } }).lean();
    return data;
  } catch (error) {
    // Handle errors
    throw new Error(`Error fetching freelist: ${error.message}`);
  }
};
const deleteBusinessByAdmin = async (businessId) => {
  const business = await FreeList.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  });
  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }
  return await FreeList.findOneAndUpdate(
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
const unDeleteBusinessByAdmin = async (businessId) => {
  const business = await FreeList.findOne({
    _id: new ObjectId(businessId),
    isDeleted: true,
  });
  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }
  return await FreeList.findOneAndUpdate(
    {
      _id: new ObjectId(businessId),
      isDeleted: true,
    },
    {
      isDeleted: false,
    },
    {
      new: true,
    },
  );
};
export const freeListService = {
  freeListSignup,
  getAllFreelist,
  deleteBusinessByAdmin,
  unDeleteBusinessByAdmin,
  getAllTrashFreelist,
  getAllFreelistMain,
  freelistLogin,
  updateFreeList,
};
