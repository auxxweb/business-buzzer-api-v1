/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createLead,
  getAllLeads,
} from "../../modules/reviews/review.controller.js";
const router = Router();
// user-endpoints
router.post("/", createLead);
router.get("/", getAllLeads);
export default router;
