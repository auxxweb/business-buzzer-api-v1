/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { createPayment } from "../../modules/payment/payment.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: false }), createPayment);
export default router;
