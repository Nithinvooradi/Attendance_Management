import express from "express";
import {
  applyLeave,
  rejectLeave,
  approveLeave,
  getAllLeaves,
  getMyLeaves,
} from "../Controllers/leaveController";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/apply", authMiddleware as any, applyLeave);

router.get("/my-leaves", authMiddleware as any, getMyLeaves);

router.get(
  "/admin",
  authMiddleware as any,
  adminMiddleware as any,
  getAllLeaves
);
router.put(
  "/admin/:id/approve",
  authMiddleware as any,
  adminMiddleware as any,
  approveLeave as any
);
router.put(
  "/admin/:id/reject",
  authMiddleware as any,
  adminMiddleware as any,
  rejectLeave
);

export default router;
