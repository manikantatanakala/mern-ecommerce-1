import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/getallcategories"
        );
        setCategories(response.data.categories); // Assuming response contains a "categories" field
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = () => {
    navigate("/myorders"); // Navigate to the "myorders" route
  };

  return (
    <div>
      <div className="p-4 bg-gray-200">
        <h2 className="font-bold mb-4">Categories</h2>
        <select
          onChange={(e) => onCategorySelect(e.target.value)}
          className="p-2 bg-white border rounded-md w-full"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryname}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3
          className="text-center cursor-pointer"
          onClick={handleClick} // Trigger navigation when clicked
        >
          My Orders
        </h3>
      </div>
    </div>
  );
};

export default Sidebar;
