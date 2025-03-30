import Cart from "../models/cartmodel/cart.js";
import Order from "../models/ordermodel/order.js";

// Create Order using userId from params
const CreateOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  const { userId } = req.params; // Get userId from URL params

  try {
    // Find the cart for the user (we can extract the userId from the cart)
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Create a new order using the cart details (items, total price, etc.)
    const newOrder = await Order.create({
      userId,
      items: cart.items,
      totalprice: cart.totalprice,
      shippingadress: shippingAddress,
      paymentmethod: "cash on delivery", // Default payment method set to COD
      orderstatus: "pending", // Default order status
    });

    // Optionally, you can clear the cart after the order is created
    cart.items = [];
    cart.totalprice = 0;
    await cart.save();

    // Return the newly created order
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get orders for a specific user
const GetOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const userorders = await Order.find({ userId }).populate({
      path: "items.productId",
      select: "name image", // Specify the fields to populate
    }); // Populating product name and image
    if (!userorders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json(userorders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export { CreateOrder, GetOrders };
