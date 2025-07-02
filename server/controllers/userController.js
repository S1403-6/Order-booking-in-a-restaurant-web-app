//usercontroller.js 
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, cartItems: [] });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


//Login User: /api/user/login

export const login = async(req,res)=>{
    try{
        const {email, password} =req.body;

        if(!email || !password)
        {
            return res.json({success: false,message: 'Both email and password are required' });
            
        }
        const user = await User.findOne({email});
        if(!user)
        {
            return res.json({sucess: false, message: 'Invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        return res.json({success: false, message: 'Invalid email or password'});
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({success: true, user: {email:user.email, name: user.name}})
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}