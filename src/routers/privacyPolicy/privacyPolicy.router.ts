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
router.get("/:businessId", getPrivacyPolicy)
router.post("/", protect({ isAdmin: false }), createPrivacyPolicy)
router.put("/:id", protect({ isAdmin: false }), updatePrivacyPolicy);
router.delete("/:id", protect({ isAdmin: false }), deletePrivacyPolicy);


export default router;
