import Business from "../../modules/business/business.model.js";
import { ReviewData } from "./businessReview.interface.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import BusinessReview from "./businessReviews.model.js";
import { FilterQuery, QueryOptions } from "mongoose";

const createBusinessReview = async (reviewData: ReviewData): Promise<any> => {
  const business: any = await Business.findOne({
    _id: new ObjectId(reviewData?.businessId),
    isDeleted: false,
  })
    .populate("selectedPlan category")
    .select("-password");

  if (business == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  const newReview = await BusinessReview.create(reviewData);

  const businessRatings = await BusinessReview.find({
    businessId: new ObjectId(reviewData?.businessId),
    isDeleted: false,
  });

  const averageRating =
    businessRatings.reduce((sum, review) => sum + review.rating, 0) /
    businessRatings.length;

  await Business.findOneAndUpdate(
    {
      _id: new ObjectId(reviewData?.businessId),
      isDeleted: false,
    },
    {
      rating: averageRating,
    },
  );

  return newReview;
};

const getAllReviews = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof BusinessReview>;
  options: QueryOptions;
}): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    BusinessReview.find(query, {}, options),
    BusinessReview.countDocuments(query),
  ]);

  return { data, totalCount };
};

const deleteReviews = async (
  reviewId: string,
  {
    businessId,
  }: {
    businessId: string;
  },
): Promise<any> => {
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
