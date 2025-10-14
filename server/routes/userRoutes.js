import express from "express";
import upload from "../middleware/upload.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { submitDetails, getSchemes, applyScheme } from "../controllers/userController.js";

const router = express.Router();
router.post("/submit", protect, authorize("user"), upload.array("documents"), submitDetails);
router.get("/schemes", protect, authorize("user"), getSchemes);
router.post("/apply", protect, authorize("user"), applyScheme);
export default router;
