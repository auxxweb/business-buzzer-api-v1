/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  checkPaymentStatus,
  createPayment,
  getCurrentPlan,
  getPaymentListing,
  activateSpecialTrail,
  deactivateSpecialTrail,
} from "../../modules/payment/payment.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: false }), createPayment);
router.get("/", protect({ isAdmin: true }), getPaymentListing);
router.get("/status", protect({ isAdmin: false }), checkPaymentStatus);
router.get("/current", protect({ isAdmin: true }), getPaymentListing);
router.get("/current-plan", protect({ isAdmin: false }), getCurrentPlan);
router.patch(
  "/activate-special-trail",
  protect({ isAdmin: true }),
  activateSpecialTrail,
);
router.patch(
  "/deactivate-special-trail",
  protect({ isAdmin: true }),
  deactivateSpecialTrail,
);

export default router;
