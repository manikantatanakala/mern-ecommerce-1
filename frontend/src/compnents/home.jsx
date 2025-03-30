import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Our App
        </h1>

        {/* Link to the Sign Up page */}
        <Link
          to="/signup"
          className="block mb-4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sign Up
        </Link>

        {/* Link to the Login page */}
        <Link
          to="/login"
          className="block px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
