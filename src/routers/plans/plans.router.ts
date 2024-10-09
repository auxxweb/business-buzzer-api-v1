/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
// import { protect } from "middleware/auth.middleware.js";
import {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
} from "../../modules/plans/plans.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", createPlan);
router.get("/", getAllPlans);
router.get("/:id", getPlanById);
router.patch("/:id", protect({ isAdmin: true }), updatePlan);

export default router;
