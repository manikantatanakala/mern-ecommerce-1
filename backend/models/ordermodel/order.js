import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalprice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderstatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shippingadress: {
    type: String,
    required: true,
  },
  paymentmethod: {
    type: String,
    enum: ["credit card", "paypal", "stripe", "cash on delivery"],
    required: true,
  },
  shippingdate: {
    type: Date,
  },
  deliverydate: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
