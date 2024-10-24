import { Request, Response } from "express";
import Leave from "../Models/leaveModel"



export const applyLeave = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { startDate, endDate, reason } = req.body;

  const newLeave = new Leave({ user: userId, startDate, endDate, reason });
  await newLeave.save();

  res.status(201).json({ message: "Leave applied successfully.", newLeave });
};
