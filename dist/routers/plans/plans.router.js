import { Router } from "express";
import { createPlan, getAllPlans, } from "../../modules/plans/plans.controller.js";
const router = Router();
// user-endpoints
router.post("/", createPlan);
router.get("/", getAllPlans);
export default router;
