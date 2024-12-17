import Business from "../../modules/business/business.model.js";
import { CreateNews } from "./businessNews.interface.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import BusinessNews from "./businessNews.model.js";
import { FilterQuery, QueryOptions } from "mongoose";
import { deleteS3 } from "../../controller/s3.controller.js";
const createNews = async ({
  businessId,
  title,
  description,
  link,
  image,
  isBanner,
}: CreateNews): Promise<any> => {
  console.log(description, "description");

  // Check if business exists
  const businessExists = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  });

  if (!businessExists) {
    return await generateAPIError(errorMessages.userNotFound, 400);
  }

  // If isBanner is true, make sure no other document has isBanner: true
  if (isBanner) {
    // Update any existing document with isBanner: true to set it to false
    await BusinessNews.updateMany(
      {
        isBanner: true,
        businessId: new ObjectId(businessId),
        isDeleted: false,
      },
      { $set: { isBanner: false } },
    );
  }

  // Create the new news article with the provided data
  return await BusinessNews.create({
    title,
    description,
    businessId,
    link,
    isBanner,
    ...(image && { image }),
  });
};

const getAllNews = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof BusinessNews>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    BusinessNews.find(query, {}, options),
    BusinessNews.countDocuments(query),
  ]);

  return { data, totalCount };
};
const updateNews = async (
  newsId: string,
  updateData: Partial<CreateNews>,
): Promise<any> => {
  // Check if isBanner is being updated to true
  if (updateData?.hasOwnProperty("isBanner") && updateData?.isBanner === true) {
    // If so, set all other isBanner: true documents to isBanner: false
    await BusinessNews.updateMany(
      {
        isBanner: true,
        _id: { $ne: new ObjectId(newsId) }, // Exclude the current news document
        isDeleted: false,
      },
      { $set: { isBanner: false } },
    );
  }

  // Find the existing news data
  const newsData: any = await BusinessNews.findOne({
    _id: new ObjectId(newsId),
    isDeleted: false,
  });

  console.log(newsData, "newsData");
  console.log(updateData, "updateData");

  if (newsData?.image !== updateData?.image) {
    await deleteS3(newsData?.image);
  }

  if (!newsData) {
    return await generateAPIError(errorMessages.newsDataNotFound, 400);
  }

  console.log(updateData, "update-data--");

  return await BusinessNews.findOneAndUpdate(
    {
      _id: new ObjectId(newsId),
      isDeleted: false,
    },
    {
      ...(updateData?.hasOwnProperty("title") && {
        title: updateData?.title,
      }),
      ...(updateData?.hasOwnProperty("description") && {
        description: updateData?.description,
      }),
      ...(updateData?.hasOwnProperty("link") && {
        link: updateData?.link,
      }),
      ...(updateData?.hasOwnProperty("image") && {
        image: updateData?.image,
      }),
      ...(updateData?.hasOwnProperty("isBanner") && {
        isBanner: updateData?.isBanner,
      }),
    },
    {
      new: true,
    },
  );
};

const deleteNews = async ({
  newsId,
  businessId,
}: {
  newsId: string;
  businessId: string;
}): Promise<any> => {
  const newsData = await BusinessNews.findOne({
    _id: new ObjectId(newsId),
    businessId: new ObjectId(businessId),
    isDeleted: false,
  });

  if (!newsData) {
    return await generateAPIError(errorMessages.newsDataNotFound, 400);
  }

  const data = await BusinessNews.findOneAndUpdate(
    {
      _id: new ObjectId(newsId),
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  if (!data) {
    return await generateAPIError("Failed to delete news, try again", 400);
  }
  return { message: "News deleted successfully!" };
};

export const newsService = {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
};
