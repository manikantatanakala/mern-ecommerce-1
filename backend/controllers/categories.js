import Category from "../models/categorymodel/category.js";
import Product from "../models/productmodel/product.js";
//create new category
const CreateCategory = async (req, res) => {
  const { categoryname } = req.body;

  try {
    if (!categoryname) {
      return res
        .status(400)
        .json({ message: "category name must be provided" });
    }
    // Check if category already exists
    const existingCategory = await Category.findOne({
      categoryname: categoryname.toLowerCase(),
    });

    if (existingCategory) {
      return res.status(401).json({ message: "Category already exists" });
    }

    const newcategory = new Category({
      categoryname,
    });
    await newcategory.save();
    return res
      .status(201)
      .json({ message: "category successfully created", newcategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};
//get single category products by id
const GetProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    // Check if category exists in the Category model
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
    const existcategory = await Product.find({
      categoryId: categoryId,
    }).populate("categoryId", "categoryname"); // Populate categoryId with category name
    // Check if products are found
    if (existcategory.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    return res.status(200).json(existcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update category

const UpdateCategory = async (req, res) => {
  const { categoryname } = req.body;
  const { categoryId } = req.params;

  if (!categoryname) {
    // Validate that categoryname is provided
    return res.status(400).json({ message: "Category name is required" });
  }
  if (categoryname === categoryname) {
    return res.status(400).json({ message: "category already exist" });
  }

  const updatecategory = await Category.findById(categoryId);
  if (!updatecategory) {
    return res.status(404).json({ message: "Category not found" });
  }
  updatecategory.categoryname = categoryname || updatecategory.categoryname;

  try {
    // Save the updated product
    const updatedcategory = await updatecategory.save();

    return res
      .status(200)
      .json({ message: "category updated successfully", updatedcategory });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
};
//get all categories
const GetAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const AllCategories = await Category.find();

    // Check if categories exist, if not return a 404 error
    if (!AllCategories || AllCategories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    // Return the categories with a success message
    return res.status(200).json({
      message: "All categories fetched successfully",
      categories: AllCategories,
    });
  } catch (error) {
    // Handle errors (e.g. database issues)
    return res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

//delete category
const DeleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const categoryToDelete = await Category.findById(categoryId);
    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category
    await categoryToDelete.deleteOne();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};
export {
  CreateCategory,
  GetProductsByCategory,
  UpdateCategory,
  DeleteCategory,
  GetAllCategories,
};
