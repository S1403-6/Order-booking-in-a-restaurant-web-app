// userRoute.js
import express from 'express';
import {login, register} from '../controllers/userController.js';
import authUser, {isAuth, logout} from '../middleware/authUser.js'

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)

userRouter.get('/is-auth', (req, res) => {
    console.log("is-auth hit");
    console.log("Cookies:", req.cookies);
    // Add logic here
    res.json({ success: true, user: { name: "Test User" } }); // for now
  });
  

export default userRouter; 