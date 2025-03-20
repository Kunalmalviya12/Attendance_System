import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./models/User.js"; // Correct import with default export

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import User Model
// import User from "./models/User.js";


// Register Route
app.post("/register", async (req, res) => {
  const { name, enrollmentNo, email, course, year, phone, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    const userExistsEnrollment = await User.findOne({ enrollmentNo });
    if (userExists) {
      return res.status(202).json({ message: "User already exists" });
    }
    if (userExistsEnrollment) {
      return res.status(202).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      enrollmentNo,
      email,
      course,
      year,
      phone,
      password: hashedPassword,

    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { enrollmentNo, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ enrollmentNo });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userName = user.name;
    res.status(200).json({ message: "Login successful", token, userName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
