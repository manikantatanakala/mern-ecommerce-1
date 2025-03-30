import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateCategory } from "./compnents/category";
import Home from "./compnents/home";
import CreateProduct from "./compnents/createproduct";
import GetProducts from "./compnents/getproducts";
import Cart from "./compnents/cart";
import Signup from "./compnents/signup";
import Login from "./compnents/login";
import OrderPage from "./compnents/orderpage";
import Checkout from "./compnents/checkout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/get-products" element={<GetProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorders" element={<OrderPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
