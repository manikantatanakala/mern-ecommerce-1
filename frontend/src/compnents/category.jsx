import React, { useState } from "react";
import Button from "./design/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the default CSS

const CreateCategory = () => {
  const [category, setCategory] = useState({
    categoryname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!category.categoryname) {
      toast.error("Category name is required", {
        className:
          "bg-red-600 text-white font-semibold p-3 rounded-lg shadow-lg transition-all transform ease-in-out duration-500",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    try {
      // Make an asynchronous request to the server to create the category
      const response = await axios.post(
        "http://localhost:3001/api/category/createcategory",
        category
      );

      if (response.status === 201) {
        toast.success("Category successfully created!", {
          className:
            "bg-green-600 text-white font-semibold p-3 rounded-lg shadow-lg transition-all transform ease-in-out duration-500",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If category already exists
        toast.error("Category already exists", {
          className:
            "bg-yellow-600 text-white font-semibold p-3 rounded-lg shadow-lg transition-all transform ease-in-out duration-500",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: true,
        });
      } else {
        // General error message
        toast.error("Error creating the category. Please try again.", {
          className:
            "bg-red-600 text-white font-semibold p-3 rounded-lg shadow-lg transition-all transform ease-in-out duration-500",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-xl text-center mb-4">Create the Category</p>
      <div className="w-1/2 sm:w-1/3 md:w-1/4">
        <input
          type="text"
          placeholder="Create the category"
          name="categoryname"
          value={category.categoryname}
          onChange={handleChange}
          className="w-full p-3 border border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-black text-center"
        />
        <div className="flex flex-col justify-center mt-4">
          <Button handleClick={handleClick} title="Add" />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-50"
      />
    </div>
  );
};

export { CreateCategory };
