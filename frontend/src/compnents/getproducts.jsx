import React, { useEffect, useState } from "react";
import Sidebar from "./design/sidebar";
import Navbar from "./design/navbar";
import Button from "./design/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigating to a detailed page

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1); // To track quantity of the selected product
  const navigate = useNavigate(); // For navigating to the product details page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:3001/api/products/getallproducts";

        if (selectedCategory) {
          url = `http://localhost:3001/api/category/getproductbycategory/${selectedCategory}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error?.response?.data?.message || "Internal server error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Filtering products based on search query
  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding products to the cart
  const handleCart = async () => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage

    if (!userId) {
      alert("You must be logged in to add products to the cart.");
      return;
    }

    if (!selectedProduct) {
      alert("Please select a product to add to the cart.");
      return;
    }

    const cartItem = {
      userId: userId,
      productId: selectedProduct._id,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/cart/add-to-cart", // Ensure the correct backend port
        cartItem
      );

      if (response.status === 201) {
        // Correct status code for created
        alert("Product added to cart!");
        navigate("/cart"); // Optionally, navigate to cart page
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding to the cart.");
    }
  };

  if (selectedProduct) {
    return (
      <div className="w-[100%] h-screen flex flex-col items-center justify-center p-4 overflow-scroll-none">
        <h1 className="text-3xl font-bold">{selectedProduct.productname}</h1>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.productname}
          className="w-64 h-64 object-cover rounded-md mt-4"
        />
        <p className="text-lg text-gray-600 mt-4">
          {selectedProduct.description}
        </p>
        <p className="text-lg font-bold mt-2">
          Price: ${selectedProduct.price}
        </p>

        {/* Quantity Input Field */}
        <div className="mt-4">
          <label className="mr-2">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min="1"
            className="p-2 border rounded-md"
          />
        </div>

        <Button handleClick={handleCart} title="ADD TO CART" />
        <Button
          title="Go Back"
          onClick={() => {
            setSelectedProduct(null); // Reset the selected product
            navigate("/get-products");
          }}
          className="mt-4 bg-gray-500"
        />
      </div>
    );
  }

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-screen grid grid-rows-3 grid-flow-col">
      <div className="row-span-3 min-h-[100px]">
        <Sidebar onCategorySelect={setSelectedCategory} />
      </div>

      <div className="col-span-3">
        <Navbar onSearch={(query) => setSearchQuery(query)} />
      </div>

      <div className="col-span-3 row-span-2 grid grid-cols-3 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center justify-center p-4 border rounded-md shadow-md cursor-pointer"
              onClick={() => {
                setSelectedProduct(product); // On product click, set the selected product
              }}
            >
              <img
                src={product.image}
                alt={product.productname}
                className="w-48 h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{product.productname}</h3>
              <p className="text-lg text-gray-500 mb-2">
                Category: {product.categoryId?.categoryname}
              </p>
              <p className="text-lg font-bold mb-4">Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default GetProducts;
