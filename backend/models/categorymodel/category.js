import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    trim: true,
    unique: "true",
  },
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
