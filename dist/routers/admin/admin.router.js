/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  adminLogin,
  createAdmin,
} from "../../modules/admin/admin.controller.js";
const router = Router();
// user-endpoints
router.post("/", createAdmin);
router.post("/login", adminLogin);
export default router;
