/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { healthCheck } from "../controller/app.controller.js";
import { getS3Urls } from "../controller/s3.controller.js";
import planRouter from "./plans/plans.router.js";
import businessRouter from "./business/business.router.js";
import categoryRouter from "./category/category.router.js";
import paymentRouter from "./payment/payment.router.js";
import adminRouter from "./admin/admin.router.js";
import dashboardRouter from "./dashboard/dashboard.js";
import termsAndServicesRouter from "./termsAndCondition/termsAndCondition.router.js";
import privacyPoliciesRouter from "./privacyPolicy/privacyPolicy.router.js";
import notificationRouter from "./notification/notification.router.js";
import contactFormRouter from "./contactForm/contactForm.router.js";
import leadRouter from "./leads/leads.router.js";
import bannerRouter from "./banners/banner.router.js";

const router = Router();
router.post("/s3url", getS3Urls);

router.get("/", healthCheck);
router.use("/plans", planRouter);
router.use("/business", businessRouter);
router.use("/category", categoryRouter);
router.use("/payment", paymentRouter);
router.use("/admin", adminRouter);
router.use("/dashboard", dashboardRouter);
router.use("/terms_and_conditions", termsAndServicesRouter);
router.use("/privacy_policies", privacyPoliciesRouter);
router.use("/notifications", notificationRouter);
router.use("/contact_forms", contactFormRouter);
router.use("/review", leadRouter);
router.use("/banner", bannerRouter);

export default router;
