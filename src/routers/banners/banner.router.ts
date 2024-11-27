/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { protect } from "../../middleware/auth.middleware.js";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  getTrashBanners,
  updateBanner,
} from "../../modules/banner/banner.controller.js";

const router = Router();
// user-endpoints
router.post("/", protect({ isAdmin: true }), createBanner);
router.get("/", getAllBanners);
router.get("/trash-banner", getTrashBanners);
router.patch("/:id", protect({ isAdmin: true }), updateBanner);
router.delete("/:id", protect({ isAdmin: true }), deleteBanner);

export default router;
