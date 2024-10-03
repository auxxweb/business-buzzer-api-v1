/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { healthCheck } from "../controller/app.controller.js";
import { getS3Urls } from "../controller/s3.controller.js";
import planRouter from "./plans/plans.router.js";
import businessRouter from "./business/business.router.js";
import categoryRouter from "./category/category.router.js";
const router = Router();
router.post("/s3url", getS3Urls);
router.get("/", healthCheck);
router.use("/plans", planRouter);
router.use("/business", businessRouter);
router.use("/category", categoryRouter);
export default router;
