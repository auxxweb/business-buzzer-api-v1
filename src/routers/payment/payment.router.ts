/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createPayment,
  getCurrentPlan,
  getPaymentListing,
} from "../../modules/payment/payment.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: false }), createPayment);
router.get("/", protect({ isAdmin: true }), getPaymentListing);
router.get("/current", protect({ isAdmin: true }), getPaymentListing);
router.get("/current-plan", protect({ isAdmin: false }), getCurrentPlan);

export default router;
