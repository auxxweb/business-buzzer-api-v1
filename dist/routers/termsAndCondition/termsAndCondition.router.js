/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { getTermsAndConditions, createTermsAndConditions, updateTermsAndConditions, deleteTermsAndConditions, getTermsAndConditionsById, getTermsAndConditionsByBusinessId, } from "../../modules/termsAndConditions/termsAndCondition.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
// user-endpoints
router.get("/", protect({ isAdmin: false }), getTermsAndConditions);
router.get("/business/:businessId", getTermsAndConditionsByBusinessId);
router.get("/:id", protect({ isAdmin: false }), getTermsAndConditionsById);
router.post("/", protect({ isAdmin: false }), createTermsAndConditions);
router.patch("/", protect({ isAdmin: false }), updateTermsAndConditions);
router.delete("/:id", protect({ isAdmin: false }), deleteTermsAndConditions);
export default router;
