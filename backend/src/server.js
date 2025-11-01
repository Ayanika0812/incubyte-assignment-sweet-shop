const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Start Server (only if not testing)
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
}

// Export app for tests
module.exports = app;
