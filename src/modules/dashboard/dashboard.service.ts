/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PaymentStatus } from "../../modules/payment/payment.enums.js";
import Business from "../../modules/business/business.model.js";
import Category from "../../modules/category/category.model.js";
import Payment from "../../modules/payment/payment.model.js";
import Plans from "../../modules/plans/plans.model.js";

function getWeekRanges(startDate: Date) {
  const weeks = [];
  const current = new Date(startDate);

  // Continue adding weekly ranges until you reach the next month
  while (current.getMonth() === startDate.getMonth()) {
    const startOfWeek = new Date(current);
    const endOfWeek = new Date(current.setDate(current.getDate() + 7));
    weeks.push({ startOfWeek, endOfWeek });
  }

  return weeks;
}

async function getWeeklyCounts(month: number, year: number) {
  const startOfMonth = new Date(year, month, 1); // First day of the month
  const startOfNextMonth = new Date(year, month + 1, 1); // First day of the next month

  const weekRanges = getWeekRanges(startOfMonth);

  const weeklyCounts = [];

  for (const range of weekRanges) {
    const count = await Business.countDocuments({
      createdAt: {
        $gte: range.startOfWeek,
        $lt:
          range.endOfWeek < startOfNextMonth
            ? range.endOfWeek
            : startOfNextMonth, // Avoid going beyond the month
      },
    });

    weeklyCounts.push({
      week: `${range.startOfWeek.toDateString()} - ${range.endOfWeek.toDateString()}`,
      count,
    });
  }

  return weeklyCounts;
}

const getAdminDashboardData = async (): Promise<any> => {
  const [
    totalPlans,
    totalBusiness,
    totalCategories,
    totalPayments,
    totalActiveBusiness,
    totalExpiredBusiness,
    totalBlockedBusiness,
    totalSuccessPayments,
    totalPendingPayments,
    totalFailedPayments,
  ] = await Promise.all([
    Plans.countDocuments(),
    Business.countDocuments(),
    Category.countDocuments(),
    Payment.countDocuments(),
    Business.countDocuments({
      paymentStatus: true,
      status: true,
    }),
    Business.countDocuments({
      paymentStatus: false,
      status: true,
    }),
    Business.countDocuments({
      status: false,
    }),
    Payment.countDocuments({
      paymentStatus: PaymentStatus.SUCCESS,
    }),
    Payment.countDocuments({
      paymentStatus: PaymentStatus.PENDING,
    }),
    Payment.countDocuments({
      paymentStatus: PaymentStatus.FAILED,
    }),
  ]);

  return {
    totalPlans,
    totalBusiness,
    totalCategories,
    totalPayments,
    totalActiveBusiness,
    totalExpiredBusiness,
    totalBlockedBusiness,
    totalSuccessPayments,
    totalPendingPayments,
    totalFailedPayments,
  };
};

const getAdminDashboardChartData = async (): Promise<any> => {
  const now = new Date();
  const currentMonth = now.getMonth(); // Current month (0-indexed, so October is 9)
  const currentYear = now.getFullYear();

  // Get the previous month and year (handle January case)
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  console.log("Current Month Weekly Counts:");
  const currentMonthCounts = await getWeeklyCounts(currentMonth, currentYear);
  console.log(currentMonthCounts);

  console.log("Previous Month Weekly Counts:");
  const previousMonthCounts = await getWeeklyCounts(
    previousMonth,
    previousMonthYear,
  );

  const paymentCounts = await Plans.aggregate([
    {
      // Lookup payments related to each plan
      $lookup: {
        from: "payments", // The collection to join with
        localField: "_id", // Plan _id
        foreignField: "plan", // The "plan" field in payments collection
        as: "paymentDetails", // The field name for the joined results
      },
    },
    {
      $project: {
        _id: 1, // Plan _id
        plan: 1, // Plan name (assuming you have this field in Plan schema)
        count: { $size: "$paymentDetails" }, // Get the size of the payments array (number of payments)
      },
    },
  ]);

  return {
    currentMonth: currentMonthCounts,
    previousMonth: previousMonthCounts,
    paymentCounts,
  };
};

export const dashboardService = {
  getAdminDashboardData,
  getAdminDashboardChartData,
};
