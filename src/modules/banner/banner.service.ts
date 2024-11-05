import { generateAPIError } from "../../errors/apiError.js";
import Banner from "./banner.model.js";
import { errorMessages } from "../../constants/messages.js";
import { FilterQuery, QueryOptions } from "mongoose";
import { ObjectId } from "constants/type.js";

const createBanner = async ({ image }: { image: string }): Promise<any> => {
  const bannerCount = await Banner.countDocuments({
    isDeleted: false,
  });

  if (bannerCount > 5) {
    return await generateAPIError(errorMessages.bannerCountExceeded, 400);
  }

  return await Banner.create({
    image,
  });
};

const getAllBanners = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Banner>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Banner.find(query, {}, options),
    Banner.countDocuments(query),
  ]);

  return { data, totalCount };
};

const updateBanner = async (
  bannerId: string,
  bannerData: any,
): Promise<any> => {
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

const deleteBanner = async (bannerId: string): Promise<any> => {
  const bannerExists = await Banner.findOne({
    _id: new ObjectId(bannerId),
    isDeleted: false,
  });

  if (!bannerExists) {
    return await generateAPIError(errorMessages.categoryNotFound, 400);
  }
  const data = await Banner.findOneAndUpdate(
    {
      _id: new ObjectId(bannerId),
      isDeleted: false,
    },
    {
      isDeleted: false,
    },
  );

  if (!data) {
    return await generateAPIError(errorMessages.bannerDeleteFailed, 400);
  }
  return {
    message: "Banner deleted successfully",
  };
};

export const bannerService = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};