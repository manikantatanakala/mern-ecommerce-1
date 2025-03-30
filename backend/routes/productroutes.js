import express from "express";
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetProducts,
  SingleProduct,
} from "../controllers/productcontroller.js";

const productrouter = express.Router();

productrouter.post("/createproduct", CreateProduct);
productrouter.put("/updateproduct/:id", UpdateProduct);
productrouter.get("/getallproducts", GetProducts);
productrouter.get("/getproduct/:id", SingleProduct);
productrouter.delete("/deleteproduct/:id", DeleteProduct);
export default productrouter;
