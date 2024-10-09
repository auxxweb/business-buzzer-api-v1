import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { dashboardService } from "./dashboard.service.js";
const getAdminDashboardData = errorWrapper(async (req, res, next) => {
  const data = await dashboardService.getAdminDashboardData();
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAdminDashboardChartData = errorWrapper(async (req, res, next) => {
  const data = await dashboardService.getAdminDashboardChartData();
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { getAdminDashboardData, getAdminDashboardChartData };