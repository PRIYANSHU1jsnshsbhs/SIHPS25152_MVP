import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getApplications, verifyApplication } from "../controllers/orgController.js";

const router = express.Router();
router.get("/applications", protect, authorize("organization"), getApplications);
router.post("/verify/:id", protect, authorize("organization"), verifyApplication);
export default router;
