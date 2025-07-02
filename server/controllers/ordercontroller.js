// controllers/orderController.js
import Order from "../models/Orders.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const { items, address, totalAmount, tax, finalAmount } = req.body;

    if (!items?.length || !address || !totalAmount || !tax || !finalAmount) {
      return res.status(400).json({ success: false, message: "Incomplete order details" });
    }

    const order = await Order.create({
      user: user._id,
      items,
      address,
      totalAmount,
      tax,
      finalAmount
    });

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
