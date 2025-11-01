const User = require("../models/User");

const admin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find user by ID from JWT payload (id, not _id)
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = admin;
