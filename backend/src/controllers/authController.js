const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate token
    // Set default role = "user"
    const role = newUser.role || "user";

    // Generate token with role
    const token = jwt.sign(
    { id: newUser._id, role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
    );

    // Return token + user info
    return res.status(201).json({
    token,
    email: newUser.email,
    role
    });


  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token including role
    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
    );

    return res.status(200).json({
    token,
    email: user.email,
    role: user.role
    });



  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
