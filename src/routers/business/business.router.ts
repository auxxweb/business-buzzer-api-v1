/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";
import {
  addProduct,
  businessExists,
  businessLogin,
  businessSignUp,
  deleteBusinessByAdmin,
  forgotPassword,
  getAllBusiness,
  getAllBusinessByAdmin,
  getAllBusinessForDropDown,
  getBusinessByCategory,
  getBusinessById,
  getBusinessDashboardData,
  getBusinessProfile,
  getTrashBusiness,
  resetPassword,
  unDeleteBusinessByAdmin,
  updateBusiness,
  updateBusinessByAdmin,
  updateBusinessIsFreeByAdmin,
  updateBusinessPassword,
  updateBusinessStatusByAdmin,
} from "../../modules/business/business.controller.js";

const router = Router();
// user-endpoints
router.post("/", businessSignUp);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/product", protect({ isAdmin: false }), addProduct);
router.post("/check", businessExists);
router.patch("/", protect({ isAdmin: false }), updateBusiness);
router.get("/profile", protect({ isAdmin: false }), getBusinessProfile);
router.get("/category/:id", getBusinessByCategory);
router.get("/dropdown", getAllBusinessForDropDown);
router.get("/all", protect({ isAdmin: true }), getAllBusinessByAdmin);
router.post("/login", businessLogin);
router.get("/", getAllBusiness);
router.get("/trash-business", protect({ isAdmin: true }), getTrashBusiness);
router.get("/dashboard", protect({ isAdmin: false }), getBusinessDashboardData);
router.get("/:id", getBusinessById);
router.patch(
  "/admin/status/:id",
  protect({ isAdmin: true }),
  updateBusinessStatusByAdmin,
);
router.patch(
  "/admin/isfree/:id",
  protect({ isAdmin: true }),
  updateBusinessIsFreeByAdmin,
);
router.patch("/admin/:id", protect({ isAdmin: true }), updateBusinessByAdmin);
router.delete("/admin/:id", protect({ isAdmin: true }), deleteBusinessByAdmin);
router.delete(
  "/admin/undelete/:id",
  protect({ isAdmin: true }),
  unDeleteBusinessByAdmin,
);

router.patch("/password", protect({ isAdmin: false }), updateBusinessPassword);

export default router;
