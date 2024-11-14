/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  submitContactForm,
  getContactFormsByBusiness,
  submitAdminNewsLetter,
} from "../../modules/contactForms/contactForm.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
// user-endpoints
router.post("/", submitContactForm);
router.post("/news-letter", submitAdminNewsLetter);
router.get("/", protect({ isAdmin: false }), getContactFormsByBusiness);
export default router;
