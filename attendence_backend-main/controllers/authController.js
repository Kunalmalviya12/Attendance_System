import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy"; 
// For QR Code-based authentication

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate QR Code Secret
    const qrSecret = speakeasy.generateSecret().base32;

    // Save user
    const newUser = new User({ name, email, password: hashedPassword, qrSecret });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", qrSecret });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Login User with JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

 