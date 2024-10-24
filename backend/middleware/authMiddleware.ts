import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/userModel";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided." });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user= decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};