
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Feedback from "./models/Feedback.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Student Feedback Manager Backend is Running!");
});

// POST: Save new feedback
app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = new Feedback({
      name,
      rating: Number(rating),
      comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback
    });
  } catch (error) {
    console.error("Feedback save error:", error.message);

    res.status(500).json({
      message: "Failed to save feedback"
    });
  }
});

// GET: Fetch all feedback
app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetch feedback error:", error.message);

    res.status(500).json({
      message: "Failed to fetch feedback"
    });
  }
});

// Connect MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
