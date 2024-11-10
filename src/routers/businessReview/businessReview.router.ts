/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createBusinessReview,
  deleteReviews,
  getAllReviews,
} from "../../modules/businessReviews/businessReview.controller.js";

const router = Router();
// user-endpoints
router.post("/", createBusinessReview);
router.get("/", getAllReviews);
router.delete("/:id", deleteReviews);

export default router;
