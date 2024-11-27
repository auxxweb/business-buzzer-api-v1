/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
// import { protect } from "middleware/auth.middleware.js";
import {
  createPlan,
  getAllPlans,
  getPlanById,
  getTrashPlans,
  updatePlan,
} from "../../modules/plans/plans.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", createPlan);
router.get("/", getAllPlans);
router.get("/trash-plans", getTrashPlans);
router.get("/:id", getPlanById);
router.patch("/:id", protect({ isAdmin: true }), updatePlan);

export default router;
