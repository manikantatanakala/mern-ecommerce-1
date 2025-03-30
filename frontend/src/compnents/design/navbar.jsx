import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update the local query state
    onSearch(e.target.value); // Pass the search query to the parent component
  };
  const handleClick = () => {
    navigate("/cart");
  };

  return (
    <div className="flex flex-row ">
      <div className="w-[45%] p-4 bg-gray-800">
        <input
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <div className="w-[30%] flex flex-col bg-gray-800 justify-center items-center">
        <FaRegUserCircle color="white" size={20} />
        {/* Display the username from localStorage */}
        <p className="text-white">{username}</p>
      </div>

      <div className="w-[20%] flex bg-gray-800 justify-start pl-20 items-center">
        <FiShoppingCart color="white" size={25} onClick={handleClick} />
      </div>
      <div className="w-[20%] pr-10 bg-gray-800 flex justify-center items-center">
        <RiLogoutCircleRFill color="white" size={30} />
      </div>
    </div>
  );
};

export default Navbar;
