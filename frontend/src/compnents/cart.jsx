import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  const fetchCart = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const cartResponse = await axios.get(
        `http://localhost:3001/api/cart/getcartproducts/${userId}`
      );
      setCart(cartResponse.data);

      const priceResponse = await axios.get(
        `http://localhost:3001/api/cart/totalprice/${userId}`
      );
      setTotalPrice(priceResponse.data.totalprice);
    } catch (error) {
      console.error("Error fetching cart items or total price:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.put("http://localhost:3001/api/cart/updatequantity", {
        userId,
        productId,
        quantity,
      });
      fetchCart(); // Refresh cart after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (productId) => {
    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:3001/api/cart/deleteitems", {
        userId,
        productId,
      });
      fetchCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle navigation to checkout page
  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the "/checkout" route
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={`${item.productId._id}-${index}`}
            className="p-4 border rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.productId.name}</h2>
                <p className="text-gray-600">{item.productId.description}</p>
                <p className="text-lg font-bold">Price: ${item.price}</p>
                <p className="text-lg">Quantity: {item.quantity}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Increase
                  </button>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                  >
                    Decrease
                  </button>
                  <button
                    onClick={() => deleteItem(item.productId._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-4">Total Price: ${totalPrice}</h2>
      <button
        onClick={handleCheckout} // Use handleCheckout for the navigation
        className="bg-green-500 text-white rounded lg py-1 px-3"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
