/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getAllCategoriesForDropDown,
  getCategoryById,
  getTrashCategories,
  updateCategory,
} from "../../modules/category/category.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
// import { protect } from "middleware/auth.middleware.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: true }), createCategory);
router.get("/", getAllCategories);
router.get("/trash-category", getTrashCategories);
router.get("/all", getAllCategoriesForDropDown);
router.get("/:id", getCategoryById);
router.patch("/:id", protect({ isAdmin: true }), updateCategory);

export default router;
