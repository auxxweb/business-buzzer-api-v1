/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import {
  adminLogin,
  createAdmin,
  updatePassword,
} from "../../modules/admin/admin.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", createAdmin);
router.post("/login", adminLogin);
router.patch("/change-password", protect({ isAdmin: true }), updatePassword);

export default router;
