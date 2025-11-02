const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.registerUser = async (req, res) => {
  try {
    console.log("📝 Registration request received:", req.body);
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate role (only allow 'user' or 'admin')
    const userRole = role && (role === 'admin' || role === 'user') ? role : 'user';

    // Create user
    console.log("👤 Creating user with role:", userRole);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    console.log("✅ User created successfully:", newUser.email);

    // Generate token with role
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("🔑 Token generated for user:", newUser.email);

    // Return token + user info
    return res.status(201).json({
      token,
      email: newUser.email,
      role: newUser.role
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
