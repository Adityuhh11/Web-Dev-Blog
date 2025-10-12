// #this script seeds an admin user into the MongoDB database.
// #Run this script once to create the admin user. Make sure to replace the placeholder values with your desired admin details.
// dont run this script multiple times as it will create duplicate admin users.
// dont push this script to production or share it publicly as it contains sensitive information.
// this script was also created with the help of an  llm to automate and this procces instead of doing manually 

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/model/user.model.js'; // Adjust path if needed

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI; // Your Atlas URI

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // --- YOUR ADMIN DETAILS ---
    const adminEmail = "example@gmail.com";
    const adminPassword = "password here"; // Choose a strong password
    const adminName = "admin name here";
    // -------------------------

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create and save the new admin user
    const adminUser = new User({
      username: adminName,
      email: adminEmail,
      password: adminPassword, // The 'pre-save' hook in your model will hash this
    });

    await adminUser.save();
    console.log('Admin user created successfully!');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};
seedAdmin();