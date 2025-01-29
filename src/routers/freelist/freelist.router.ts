import { Router } from "express";
import { deleteBusinessByAdmin,freeListLogin,freeListSignUp, getAllFreelist, getAllFreelistMain, getTrashBusiness, unDeleteBusinessByAdmin } from "../../modules/freelist/freelist.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
router.post("/", freeListSignUp);
router.post("/login", freeListLogin);
router.get("/", getAllFreelistMain);
router.delete("/admin/:id", protect({ isAdmin: true }), deleteBusinessByAdmin);
router.delete("/admin/undelete/:id",protect({ isAdmin: true }), unDeleteBusinessByAdmin);
router.get("/trash-freelist", protect({ isAdmin: true }), getTrashBusiness);


export default router;
