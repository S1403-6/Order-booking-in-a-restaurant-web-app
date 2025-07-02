import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import Order from "../models/Orders.js";
import User from "../models/User.js";

// Helper to send cookie
const sendToken = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    try {
      const isMatch = await admin.matchPassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      sendToken(res, admin._id);
  
      res.status(200).json({
        success: true,
        admin: {
          id: admin._id,
          email: admin.email,
        },
      });
    } catch (err) {
      // Handle comparison errors (e.g., if password was not hashed)
      console.error("Password match error:", err);
      return res.status(500).json({ message: "Internal error during password check" });
    }
  };
  

export const logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'name email');
      res.json({ success: true, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
  };
  
  // Get all users (customers)
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'name email');
      res.json({ success: true, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error fetching users' });
    }
  };