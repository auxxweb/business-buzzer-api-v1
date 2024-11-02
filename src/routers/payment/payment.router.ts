/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { createPayment, getPaymentListing } from "../../modules/payment/payment.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: false }), createPayment);
router.get("/", protect({ isAdmin: true }), getPaymentListing)

export default router;
