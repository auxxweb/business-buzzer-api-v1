import { Router } from "express";
import {
  deleteBusinessByAdmin,
  freeListLogin,
  freeListSignUp,
  getAllFreelistMain,
  getFreeListById,
  getTrashBusiness,
  unDeleteBusinessByAdmin,
  updateFreeList,
} from "../../modules/freelist/freelist.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/", freeListSignUp);
router.post("/login", freeListLogin);
router.patch("/:id", updateFreeList);
router.get("/", getAllFreelistMain);
router.get("/:id", getFreeListById);
router.delete("/admin/:id", protect({ isAdmin: true }), deleteBusinessByAdmin);
router.delete(
  "/admin/undelete/:id",
  protect({ isAdmin: true }),
  unDeleteBusinessByAdmin,
);
router.get("/trash-freelist", protect({ isAdmin: true }), getTrashBusiness);
export default router;
