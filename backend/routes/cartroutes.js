// routes/cartroutes.js
import express from "express";
import {
  UpdateQuantity,
  DeleteItems,
  GetTotalPrice,
  GetCartProducts,
  AddToCart,
} from "../controllers/cartcontroller.js";

const cartrouter = express.Router();

// Define routes for cart operations
cartrouter.put("/updatequantity", UpdateQuantity); // Update product quantity
cartrouter.post("/add-to-cart", AddToCart);
cartrouter.post("/deleteitems", DeleteItems); // Delete item from cart
cartrouter.get("/totalprice/:userId", GetTotalPrice); // Get total price of cart
cartrouter.get("/getcartproducts/:userId", GetCartProducts); // Get all products in cart

export default cartrouter;
