import axios from "axios";
import React, { useState } from "react";
import Button from "./design/Button"; // Assuming you already have a Button component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        login
      );

      console.log("Login response:", response);

      const { token } = response.data;
      const { username, id } = response.data.user;

      if (username && id) {
        localStorage.setItem("username", username);
        localStorage.setItem("userId", id);
        console.log(username);
      }
      localStorage.setItem("token", token);

      navigate("/get-products");
    } catch (error) {
      console.log("Error while logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={login.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={login.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            title="Login"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
