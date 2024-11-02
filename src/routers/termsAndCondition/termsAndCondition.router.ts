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
router.get("/", getTermsAndConditions)
router.post("/", protect({ isAdmin: true }), createTermsAndConditions)
router.patch("/:id", protect({ isAdmin: true }), updateTermsAndConditions);
router.delete("/:id", protect({ isAdmin: true }), deleteTermsAndConditions);


export default router;
