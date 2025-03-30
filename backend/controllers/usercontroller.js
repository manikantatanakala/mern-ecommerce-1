import User from "../models/usermodel/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
//Signup
const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  const { genSalt } = bcrypt;

  // Check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //check the user exists
  try {
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(400).json({ message: "user already exist" });
    }
    //hash the password
    const salt = await genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      username,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    //create the token
    const token = jwt.sign({ id: newuser._id }, PRIVATE_KEY, {
      expiresIn: "1d",
    });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

//login
const Login = async (req, res) => {
  const { email, password } = req.body;
  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existuser = await User.findOne({ email });
    if (!existuser) {
      return res.status(400).json("invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, existuser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: existuser._id }, PRIVATE_KEY, {
      expiresIn: "1d",
    });

    // Respond with user details and JWT token
    res.json({
      message: "Login successful",
      user: {
        id: existuser._id,
        username: existuser.username,
        email: existuser.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
export { Signup, Login };
