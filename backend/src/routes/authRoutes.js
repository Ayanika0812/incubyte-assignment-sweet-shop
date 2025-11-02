const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/test", (req, res) => res.send("Auth OK"));

// Test endpoint for debugging
router.post("/test-register", (req, res) => {
  console.log("🧪 Test register endpoint hit:", req.body);
  res.json({ message: "Test endpoint working", body: req.body });
});


module.exports = router;
