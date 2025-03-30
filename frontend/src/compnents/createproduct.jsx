import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./design/Button";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    productname: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/getallcategories"
        );

        // Assuming the response structure has a 'categories' key that holds the array
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories); // Access categories from the response
        } else {
          setError("Categories not found in response data");
        }
      } catch (error) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products/createproduct",
        product
      );
      console.log(response.data);

      // Clear the form data after successful submission
      setProduct({
        productname: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        categoryId: "",
      });
    } catch (error) {
      console.error(error);
      setError("Error creating product");
    }
  };

  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center">
      <h1>Create the Product</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="w-1/2 sm:w-1/3 md:w-1/4 flex items-center flex-col">
        <div>
          <input
            type="text"
            onChange={handleChange}
            value={product.productname}
            name="productname"
            placeholder="Enter the product name"
            className="w-full p-3 mb-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            value={product.description}
            name="description"
            placeholder="Enter the description"
            className="w-full p-3 mb-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          />
        </div>
        <div>
          <input
            type="number"
            onChange={handleChange}
            value={product.price}
            name="price"
            placeholder="Enter the price"
            className="w-full p-3 mb-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          />
        </div>
        <div>
          <input
            type="number"
            onChange={handleChange}
            value={product.stock}
            name="stock"
            placeholder="Enter the stock"
            className="w-full p-3 mb-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          />
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            value={product.image}
            name="image"
            placeholder="Enter the image URL"
            className="w-full p-3 mb-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          />
        </div>

        <div>
          <select
            onChange={handleChange}
            value={product.categoryId}
            name="categoryId"
            required
            className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button handleClick={handleClick} title="Add Product" />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
