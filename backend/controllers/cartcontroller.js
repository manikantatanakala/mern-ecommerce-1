import Cart from "../models/cartmodel/cart.js";
import Product from "../models/productmodel/product.js";
// Add to Cart
export const AddToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist in the cart, add new item
        cart.items.push({ productId, quantity, price: product.price });
      }

      cart.totalprice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      // If no cart exists, create a new cart
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity, price: product.price }],
        totalprice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Other functions remain unchanged

// Update Quantity
export const UpdateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.items[itemIndex].quantity = quantity;
    cart.totalprice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    cart = await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete Items
export const DeleteItems = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId != productId);
    cart.totalprice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    cart = await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get Total Price
export const GetTotalPrice = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json({ totalprice: cart.totalprice });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get Cart Products
export const GetCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json(cart.items);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
