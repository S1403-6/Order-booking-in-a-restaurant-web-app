import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

const admin = new Admin({
  email: "snigdhastp@gmail.com",
  password: "1234", // will be hashed automatically
});

await admin.save();
console.log('Admin created');
process.exit();
