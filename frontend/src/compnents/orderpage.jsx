import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/order/getorders/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders. Please try again later.");
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
            <p className="text-lg">Total Price: ${order.totalprice}</p>
            <p className="text-lg">Order Status: {order.orderstatus}</p>
            <p className="text-lg">Shipping Address: {order.shippingaddress}</p>
            <p className="text-lg">Payment Method: {order.paymentmethod}</p>
            <div className="space-y-2 mt-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.productId.image} // Ensure the image URL is correct
                    alt={item.productId.name} // Ensure the name is correct
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">
                      {item.productId.name}
                    </h2>
                    <p className="text-gray-600">
                      {item.productId.description}
                    </p>
                    <p className="text-lg">Price: ${item.price}</p>
                    <p className="text-lg">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
