import express from "express";
import {
  CreateCategory,
  GetProductsByCategory,
  UpdateCategory,
  DeleteCategory,
  GetAllCategories,
} from "../controllers/categories.js";

const categoryrouter = express.Router();

categoryrouter.post("/createcategory", CreateCategory);
categoryrouter.get("/getproductbycategory/:categoryId", GetProductsByCategory);
categoryrouter.get("/getallcategories", GetAllCategories);
categoryrouter.put("/updatecategory", UpdateCategory);
categoryrouter.delete("/deletecategory", DeleteCategory);
export default categoryrouter;
