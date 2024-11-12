import { Request, Response } from "express";
import User from "../Models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//generating the credentials
const generateCredentials = (name: string, mobile: string) => {
  const username = name.slice(0, 3) + mobile.slice(-3);
  const password = Math.random().toString(36).slice(-8);
  return { username, password };
};


//sending the mail
const sendMail = async (email: string, username: string, password: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      debug: true,
    });

    const mailOptions = {
      from: `"Your Service" <${process.env.MAIL}>`,
      to: email,
      subject: "Credentials for Attendance at Gradious Office",
      text: `Hi ${username}, your account has been created successfully! Your credentials are:
    Username: ${username}
    Password: ${password}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};



//Adding the User
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, mobile } = req.body;
    const { username, password } = generateCredentials(name, mobile);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      mobile,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    await sendMail(email, username, password);
    res
      .status(201)
      .json({ message: "User added successfully", username, password });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
};


//Logging as User
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  if (user.isFirstLogin) {
    return res
      .status(200)
      .json({ token, user, message: "Reset password required", firstLogin: true });
  }

 
  res.status(200).json({ token, user });
};


//Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const userId = (req as any).user!.id;
  const { newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    isFirstLogin: false,
  });

  res.status(200).json({ message: "Password reset successfully." });
};



//Getting employees and learners
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const data = await User.find({ role: "employee" });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getLearners = async (req: Request, res: Response) => {
  try {
    const data = await User.find({ role: "learner" });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
