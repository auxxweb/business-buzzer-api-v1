import { ObjectId } from "../../constants/type.js";
import Payment from "../../modules/payment/payment.model.js";

export const checkAnyActiveBusinesses = async (
  categoryId: string,
): Promise<number> => {
  const today = new Date();

  const businesses = await Payment.aggregate([
    {
      $lookup: {
        from: "businesses",
        localField: "business",
        foreignField: "_id",
        as: "businesses",
      },
    },
    {
      $match: {
        isDeleted: false,
        paymentStatus: "success",
        "businesses.category": new ObjectId(categoryId),
        "businesses.isDeleted": false,
        expiryDate: { $gt: today },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 1,
    },
    {
      $count: "businessCount",
    },
  ]);

  // If there are results, businesses[0].businessCount will have the count, otherwise return 0
  const count = businesses?.length > 0 ? businesses[0]?.businessCount : 0;
  console.log(today, "today (comparison date)", businesses);

  return count;
};
