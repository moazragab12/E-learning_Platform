const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

const lessonRoutes = require("./routes/lessonRoutes");
app.use("/api/lessons", lessonRoutes);

app.get("/", (req, res) => {
  res.send("📚 Course API is running!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(6000, () => {
      console.log("🚀 Server running on http://localhost:6000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
