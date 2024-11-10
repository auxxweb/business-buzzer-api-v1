import Business from "../../modules/business/business.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import BusinessReview from "./businessReviews.model.js";
const createBusinessReview = async (reviewData) => {
  const business = await Business.findOne({
    _id: new ObjectId(reviewData?.businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");
  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }
  return await BusinessReview.create(reviewData);
};
const getAllReviews = async ({ query, options }) => {
  const [data, totalCount] = await Promise.all([
    BusinessReview.find(query, {}, options),
    BusinessReview.countDocuments(query),
  ]);
  return { data, totalCount };
};
const deleteReviews = async (reviewId, { businessId }) => {
  const reviewData = await BusinessReview.findOne({
    businessId: new ObjectId(businessId),
    _id: new ObjectId(reviewId),
    isDeleted: false,
  });
  if (!reviewData) {
    return await generateAPIError(errorMessages.reviewNotFound, 400);
  }
  return await BusinessReview.findOneAndUpdate(
    {
      businessId: new ObjectId(businessId),
      _id: new ObjectId(reviewId),
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
export const businessReviewService = {
  createBusinessReview,
  getAllReviews,
  deleteReviews,
};
