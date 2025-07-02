//auth user.js

import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
            next();
        } else {
            return res.json({ success: false, message: 'Not Authorized' });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export default authUser; 

export const isAuth = async (req, res) => {
    try {
        const userId = req.user?.id;  // ✅ fixed
        if (!userId) return res.json({ success: false, message: 'Not authorized' });

        const user = await User.findById(userId).select("-password");
        if (!user) return res.json({ success: false, message: 'User not found' });

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
