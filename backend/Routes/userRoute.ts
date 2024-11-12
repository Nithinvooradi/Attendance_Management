import express from "express";
import {
  addUser,
  getEmployees,
  getLearners,
  loginUser,
  resetPassword,
} from "../Controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/add", addUser);
router.post("/login",loginUser as any);
router.post("/reset-password",authMiddleware as any,resetPassword);
// router.get("/employees", getEmployees);
// router.get("/learners", getLearners);

export default router;
