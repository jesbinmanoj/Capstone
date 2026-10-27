const mongoose = require('mongoose');

let isMongoConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasktrack_capstone';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${uri}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB server: ${error.message}`);
    console.log(`[MongoDB Fallback] Server will operate seamlessly using high-speed In-Memory Data Store with default seed accounts.`);
    console.log(`[MongoDB Setup Tip] To connect to MongoDB Atlas, add your MONGODB_URI in server/.env`);
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = { connectDB, getMongoStatus };
