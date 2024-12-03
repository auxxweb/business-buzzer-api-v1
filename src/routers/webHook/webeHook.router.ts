/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from "express";
import { updatePaymentWebHook } from "../../modules/payment/payment.controller.js";

const router = Router();
router.post( 
  "/",
  express.raw({ type: "application/json" }),
  updatePaymentWebHook,
);

export default router;
