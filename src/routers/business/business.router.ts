/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

// import { protect } from "../../middleware/auth.middleware.js";
import {
  businessLogin,
  businessSignUp,
  getAllBusiness,
  getBusinessByCategory,
  getBusinessById,
} from "../../modules/business/business.controller.js";

const router = Router();
// user-endpoints
router.post("/", businessSignUp);
router.get("/category/:id", getBusinessByCategory);
router.post("/login", businessLogin);
router.get("/:id", getBusinessById);
router.get("/", getAllBusiness);

export default router;
