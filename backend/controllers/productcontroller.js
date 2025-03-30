import Product from "../models/productmodel/product.js";
import Category from "../models/categorymodel/category.js";

const CreateProduct = async (req, res) => {
  const { productname, description, price, stock, image, categoryId } =
    req.body;
  // Validate the product data
  if (
    !productname ||
    !description ||
    !price ||
    !stock ||
    !image ||
    !categoryId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const product = new Product({
      productname,
      description,
      price,
      stock,
      image,
      categoryId,
    });
    await product.save();
    return res
      .status(201)
      .json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "product not added", error: error.message });
  }
};
//update the product

const UpdateProduct = async (req, res) => {
  const { productname, description, price, stock, image, categoryId } =
    req.body;

  const exsitproduct = await Product.findById(req.params.id);
  if (!exsitproduct) {
    return res.status(400).json({ message: "product not found" });
  }
  // Only update fields that are provided in the request body
  exsitproduct.productname = productname || exsitproduct.productname;
  exsitproduct.description = description || exsitproduct.description;
  exsitproduct.price = price || exsitproduct.price;
  exsitproduct.stock = stock || exsitproduct.stock;
  exsitproduct.image = image || exsitproduct.image;
  exsitproduct.categoryId = categoryId || exsitproduct.categoryId;

  try {
    // Save the updated product
    const updatedProduct = await exsitproduct.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};
//get all products

const GetProducts = async (req, res) => {
  try {
    const AllProducts = await Product.find().populate(
      "categoryId",
      "categoryname",
      null,
      { strictPopulate: false }
    );

    return res.status(200).json(AllProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get prodcut by id(single product)

const SingleProduct = async (req, res) => {
  try {
    const getproduct = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    return res.status(200).json(getproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete prodcut by id

const DeleteProduct = async (req, res) => {
  try {
    const deleteproduct = await Product.findById(req.params.id);
    if (!deleteproduct) {
      return res.status(404).json("product not found");
    }
    await deleteproduct.deleteOne();

    return res.status(200).json("product deleted successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

export {
  CreateProduct,
  UpdateProduct,
  GetProducts,
  SingleProduct,
  DeleteProduct,
};
