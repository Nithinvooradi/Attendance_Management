import { Request, Response } from "express";
import Leave from "../Models/leaveModel";

export const applyLeave = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { startDate, endDate, reason } = req.body;

  const newLeave = new Leave({ userId: userId, startDate, endDate, reason });

  await newLeave.save();

  res.status(201).json({ message: "Leave applied successfully.", newLeave });
};

export const getMyLeaves = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const leaves = await Leave.find({ userId: userId }).populate(
      "userId",
      "name email"
    );

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leave records" });
  }
};

//Get All Leaves
export const getAllLeaves = async (req: Request, res: Response) => {
  // console.log("hello");
  try {
    const leaves = await Leave.find();
    // console.log(leaves);
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all the leave requests" });
  }
};

export const approveLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!leave)
      return res.status(404).json({ error: "Leave request not found" });
    res.status(200).json({ message: "Leave approved", leave });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve the leave" });
  }
};

export const rejectLeave = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );
    if (!leave) res.status(404).json({ error: "leave request not found" });
    res.status(200).json({ message: "Leave Rejected", leave });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject the leave" });
  }
};
