import { generateAPIError } from "../../errors/apiError.js";
import Banner from "./banner.model.js";
import { errorMessages } from "../../constants/messages.js";
import { ObjectId } from "../../constants/type.js";
const createBanner = async ({ image }) => {
  const bannerCount = await Banner.countDocuments({
    isDeleted: false,
  });
  if (bannerCount >= 5) {
    return await generateAPIError(errorMessages.bannerCountExceeded, 400);
  }
  return await Banner.create({
    image,
  });
};
const getAllBanners = async ({ query, options }) => {
  const [data, totalCount] = await Promise.all([
    Banner.find(query, {}, options),
    Banner.countDocuments(query),
  ]);
  return { data, totalCount };
};
const updateBanner = async (bannerId, bannerData) => {
  const bannerExists = await Banner.findOne({
    _id: new ObjectId(bannerId),
    isDeleted: false,
  });
  if (!bannerExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }
  return await Banner.findOneAndUpdate(
    {
      _id: new ObjectId(bannerId),
      isDeleted: false,
    },
    {
      ...(bannerData?.image && {
        image: bannerData?.image,
      }),
    },
    {
      new: true,
    },
  );
};
const deleteBanner = async (bannerId) => {
  const bannerExists = await Banner.findOne({
    _id: new ObjectId(bannerId),
    isDeleted: false,
  });
  console.log(bannerExists, "banner");
  if (!bannerExists) {
    return await generateAPIError(errorMessages.bannerNOtFound, 400);
  }
  const data = await Banner.findOneAndUpdate(
    {
      _id: new ObjectId(bannerId),
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
  );
  if (!data) {
    return await generateAPIError(errorMessages.bannerDeleteFailed, 400);
  }
  return data;
};
export const bannerService = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
