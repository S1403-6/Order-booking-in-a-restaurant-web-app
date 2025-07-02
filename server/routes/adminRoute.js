import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/admincontroller.js";
import verifyAdmin from "../middleware/authAdmin.js";
import { getAllOrders, getAllUsers } from '../controllers/admincontroller.js';

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);
router.get("/profile", verifyAdmin, (req, res) => {
  res.json({ admin: req.admin });
});
router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);

export default router;
