/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  adminLogin,
  forgotPasswordAdmin,
  resetPassword,
  // createAdmin,
  updatePassword,
} from "../../modules/admin/admin.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
// user-endpoints
// router.post("/", createAdmin);
router.post("/login", adminLogin);
router.patch("/change-password", protect({ isAdmin: true }), updatePassword);
router.post("/forgot-password", forgotPasswordAdmin);
router.post("/reset-password", resetPassword);
export default router;
