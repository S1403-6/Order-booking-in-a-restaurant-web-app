import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cartItems: {type: Object, required: true},
}, {minimize: false})

const User  = mongoose.model('user', userSchema)

export default User 
