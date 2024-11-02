/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
    getPrivacyPolicy,
    createPrivacyPolicy,
    updatePrivacyPolicy,
    deletePrivacyPolicy
} from "../../modules/privacyPolicies/privacyPolicies.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.get("/", getPrivacyPolicy)
router.post("/", protect({ isAdmin: true }), createPrivacyPolicy)
router.patch("/:id", protect({ isAdmin: true }), updatePrivacyPolicy);
router.delete("/:id", protect({ isAdmin: true }), deletePrivacyPolicy);


export default router;
