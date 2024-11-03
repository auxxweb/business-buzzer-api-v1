/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
    getNotificationByUser
} from "../../modules/notification/notification.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.get("/", protect({ isAdmin: false }), getNotificationByUser);
router.get("/admin", protect({ isAdmin: true }), getNotificationByUser);


export default router;
