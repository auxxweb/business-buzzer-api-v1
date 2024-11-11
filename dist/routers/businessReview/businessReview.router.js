/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createBusinessReview,
  deleteReviews,
  getAllReviews,
  getAllReviewsById,
} from "../../modules/businessReviews/businessReview.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
// user-endpoints
router.post("/", createBusinessReview);
router.get("/", protect({ isAdmin: false }), getAllReviews);
router.get("/:id", getAllReviewsById);
router.delete("/:id", deleteReviews);
export default router;
