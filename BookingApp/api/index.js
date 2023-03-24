import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotels.js";
import roomRoutes from "./routes/rooms.js";
import userRoutes from "./routes/users.js";
dotenv.config();
const app = express();

const connect = async () => {
  try {
    console.log("going to connect to db");
    await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongo disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

//middleware
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
