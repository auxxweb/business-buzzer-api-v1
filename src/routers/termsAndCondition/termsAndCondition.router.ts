/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
    getTermsAndConditions,
    createTermsAndConditions,
    updateTermsAndConditions,
    deleteTermsAndConditions
} from "../../modules/termsAndConditions/termsAndCondition.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.get("/:businessId", getTermsAndConditions)
router.post("/", protect({ isAdmin: false }), createTermsAndConditions)
router.put("/:id",protect({ isAdmin: false }), updateTermsAndConditions);
router.delete("/:id", protect({ isAdmin: false }), deleteTermsAndConditions);


export default router;
