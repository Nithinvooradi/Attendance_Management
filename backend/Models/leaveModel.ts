import mongoose, { Document, Schema } from "mongoose";

export interface Leave extends Document {
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  noOfDays: number;
}

const leaveSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: String,
  endDate: String,
  reason: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  noOfDays: Number,
});

export default mongoose.model<Leave>("Leave", leaveSchema);
