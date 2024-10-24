import mongoose, { Document, Schema } from "mongoose";

export interface Attendance extends Document {
    userId: string;
    date: string;
    login: string;
    logout: string;
    hours: number;
  }
  
  const attendanceSchema:Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    date: String,
    login: String,
    logout: String,
    hours: Number
  });
 
  export default mongoose.model<Attendance>("Attendances",attendanceSchema);
  