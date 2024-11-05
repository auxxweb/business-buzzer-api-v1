/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
  businessLogin,
  businessSignUp,
  deleteBusinessByAdmin,
  getAllBusiness,
  getAllBusinessByAdmin,
  getBusinessByCategory,
  getBusinessById,
  getBusinessProfile,
  updateBusiness,
  updateBusinessByAdmin,
  updateBusinessPassword,
  updateBusinessStatusByAdmin,
} from "../../modules/business/business.controller.js";
const router = Router();
// user-endpoints
router.post("/", businessSignUp);
router.get("/profile", protect({ isAdmin: false }), getBusinessProfile);
router.get("/category/:id", getBusinessByCategory);
router.get("/all", protect({ isAdmin: true }), getAllBusinessByAdmin);
router.post("/login", businessLogin);
router.get("/:id", getBusinessById);
router.get("/", getAllBusiness);
router.patch(
  "/admin/status/:id",
  protect({ isAdmin: true }),
  updateBusinessStatusByAdmin,
);
router.patch("/admin/:id", protect({ isAdmin: true }), updateBusinessByAdmin);
router.delete("/admin/:id", protect({ isAdmin: true }), deleteBusinessByAdmin);
router.patch("/", protect({ isAdmin: false }), updateBusiness);
router.patch("/password", protect({ isAdmin: false }), updateBusinessPassword);
export default router;
