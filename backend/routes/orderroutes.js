import express from "express";
import { CreateOrder, GetOrders } from "../controllers/ordercontroller.js"; // Ensure the path is correct

const orderrouter = express.Router();

// Route to create an order
orderrouter.post("/checkout/:userId", CreateOrder); // Route for creating orders

// Route to get orders for a specific user
orderrouter.get("/getorders/:userId", GetOrders); // Route for fetching user orders

export default orderrouter;
