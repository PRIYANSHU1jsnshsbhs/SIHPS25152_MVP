import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getPendingUsers, approveUser, rejectUser, addDummySchemes, listAllUsers } from "../controllers/adminController.js";

const router = express.Router();
router.get("/pending", protect, authorize("admin"), getPendingUsers);
router.get("/users", protect, authorize("admin"), listAllUsers);
router.post("/approve/:id", protect, authorize("admin"), approveUser);
router.post("/reject/:id", protect, authorize("admin"), rejectUser);
router.post("/seed-schemes", protect, authorize("admin"), addDummySchemes);
export default router;
