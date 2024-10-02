/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { healthCheck } from "../controller/app.controller.js";
import { getS3Urls } from "../controller/s3.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import planRouter from "./plans/plans.router.js";
import businessRouter from "./business/business.router.js";

const router = Router();
router.post("/s3url", protect(), getS3Urls);

router.get("/", healthCheck);
router.use("/plans", planRouter);
router.use("/business", businessRouter);

export default router;
