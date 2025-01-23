import { Router } from "express";
import { freeListSignUp, getAllFreelist } from "../../modules/freelist/freelist.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = Router();
router.post("/", freeListSignUp);
router.get("/", getAllFreelist);


export default router;
