import express from "express";
import { Signup, Login } from "../controllers/usercontroller.js"; // Correct import with .js extension

const userrouter = express.Router();

userrouter.post("/signup", Signup);
userrouter.post("/login", Login);

export default userrouter;
