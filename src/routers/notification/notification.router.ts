/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
    getNotificationByUser
} from "../../modules/notification/notification.controller.js";

const router = Router();
// user-endpoints
router.get("/", getNotificationByUser);

export default router;
