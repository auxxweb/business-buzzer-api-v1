/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { createAdminTerms, getAdminTerms, updateAdminTerms, } from "../../modules/adminTerms/adminTerms.controller.js";
const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: true }), createAdminTerms);
router.get("/", getAdminTerms);
router.patch("/", protect({ isAdmin: true }), updateAdminTerms);
export default router;
