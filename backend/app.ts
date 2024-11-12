import express, { Application, Request, Response } from "express";
import connectDB from "./config/db";
import userRoutes from "./Routes/userRoute";
import leaveRoutes from "./Routes/leaveRoute"
import User from "./Models/userModel";
const cors = require("cors")

const app: Application = express();
app.use(cors())
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/leaves",leaveRoutes);

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("Server started running on port 8080");
});
