import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  role: "admin" | "employee" | "learner";
  password: string;
  username: string;
  mobile: string;
  isFirstLogin: boolean;
  // attendance: { date: string; login: string; logout: string; hours: string }[];
  // leaves: {
  //   startDate: string;
  //   endDate: string;
  //   reason: string;
  //   status: string;
  // }[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "learner", "employee"],
    required: true,
  },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  isFirstLogin: { type: Boolean, default: true },

});

export default mongoose.model<User>("USERS", userSchema);
