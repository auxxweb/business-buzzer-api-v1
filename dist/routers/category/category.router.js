/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { createCategory, getAllCategories, } from "../../modules/category/category.controller.js";
// import { protect } from "middleware/auth.middleware.js";
const router = Router();
// user-endpoints
router.post("/", createCategory);
router.get("/", getAllCategories);
export default router;
