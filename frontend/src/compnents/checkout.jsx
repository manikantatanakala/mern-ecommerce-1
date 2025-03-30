import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const OrderPage = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);
  const [paymentMethod] = useState("Cash on Delivery"); // Default payment method
  const navigate = useNavigate(); // Use navigate instead of history

  // Handle form submission to create an order
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // Get userId from localStorage

    if (!userId) {
      setError("User ID not found. Please log in.");
      return;
    }

    if (!shippingAddress) {
      setError("Please provide a shipping address.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        shippingAddress,
        paymentMethod,
      };

      // Send order data to backend to create the order
      const response = await axios.post(
        `http://localhost:3001/api/order/checkout/${userId}`,
        orderData
      );
      
      setOrderCreated(true);
      setLoading(false);

      // Optionally, redirect user after order is created
      navigate(`/myorders`);
    } catch (error) {
      setLoading(false);
      setError("Failed to create the order.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Order</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Success Message */}
      {orderCreated && (
        <p className="text-green-500">Order successfully created!</p>
      )}

      {/* Shipping Address Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="shippingAddress"
            className="block text-lg font-bold mb-2"
          >
            Shipping Address:
          </label>
          <textarea
            id="shippingAddress"
            className="w-full p-2 border rounded-lg"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        {/* Display Default Payment Method */}
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-lg font-bold mb-2"
          >
            Payment Method:
          </label>
          <input
            type="text"
            id="paymentMethod"
            className="w-full p-2 border rounded-lg"
            value={paymentMethod}
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Create Order
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="text-blue-500 mt-4">Creating your order...</div>
      )}
    </div>
  );
};

export default OrderPage;
