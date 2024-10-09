/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";
import {
  getAdminDashboardChartData,
  getAdminDashboardData,
} from "../../modules/dashboard/dashboard.controller.js";

const router = Router();
// user-endpoints
router.get("/admin", protect({ isAdmin: true }), getAdminDashboardData);
router.get(
  "/admin/chart",
  protect({ isAdmin: true }),
  getAdminDashboardChartData,
);

export default router;
