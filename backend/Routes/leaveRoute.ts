import express from "express";
import { applyLeave } from "../Controllers/leaveController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/apply", authMiddleware as any, applyLeave); // User applies for leave

export default router;
