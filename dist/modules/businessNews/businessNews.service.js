import Business from "../../modules/business/business.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import BusinessNews from "./businessNews.model.js";
import { deleteS3 } from "../../controller/s3.controller.js";
const createNews = async ({ businessId, title, description, link, image }) => {
  console.log(description, "description");
  const businessExists = await Business.findOne({
    _id: new ObjectId(businessId),
    isDeleted: false,
  });
  if (!businessExists) {
    return await generateAPIError(errorMessages.userNotFound, 400);
  }
  return await BusinessNews.create({
    title,
    description,
    businessId,
    link,
    ...(image && {
      image,
    }),
  });
};
const getAllNews = async ({ query, options }) => {
  const [data, totalCount] = await Promise.all([
    BusinessNews.find(query, {}, options),
    BusinessNews.countDocuments(query),
  ]);
  return { data, totalCount };
};
const updateNews = async (newsId, updateData) => {
  const newsData = await BusinessNews.findOne({
    _id: new ObjectId(newsId),
    isDeleted: false,
  });
  console.log(newsData, "nesssssssssssssssssss");
  console.log(updateData, "updateeeeee");
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
      ...(updateData?.title && {
        title: updateData?.title,
      }),
      ...(updateData?.description && {
        description: updateData?.description,
      }),
      ...(updateData?.link && {
        link: updateData?.link,
      }),
      ...(updateData?.image && {
        image: updateData?.image,
      }),
    },
    {
      new: true,
    },
  );
};
const deleteNews = async ({ newsId, businessId }) => {
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
