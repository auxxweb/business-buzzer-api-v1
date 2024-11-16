/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";
import {
  createNews,
  deleteNews,
  getAllNews,
  getAllNewsById,
  updateNews,
} from "../../modules/businessNews/businessNews.controller.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: false }), createNews);
router.get("/", protect({ isAdmin: false }), getAllNews);
router.get("/:id", getAllNewsById);
router.patch("/:id", protect({ isAdmin: false }), updateNews);
router.delete("/:id", protect({ isAdmin: false }), deleteNews);

export default router;
