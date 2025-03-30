import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userrouter from "./routes/userroutes.js";
import productrouter from "./routes/productroutes.js";
import categoryrouter from "./routes/categoryroutes.js";
import cartrouter from "./routes/cartroutes.js";
import orderrouter from "./routes/orderroutes.js";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;
const app = express();
//middleware

// Allow CORS from localhost:5174
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Important for credentials like cookies
  })
);

app.use(express.json());
//db connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MONGO_DB connected successfully"))
  .catch((err) => console.error(err));
// Routes
app.use("/api/users", userrouter);
app.use("/api/products", productrouter);
app.use("/api/category", categoryrouter);
app.use("/api/cart", cartrouter);
app.use("/api/order", orderrouter);
// app.get("/", (req, res) => {
//   res.send("welcome to the ecommerce app");
// });
//start the server
app.listen(PORT, () => {
  console.log(`server running on the ${PORT} successfully`);
});
