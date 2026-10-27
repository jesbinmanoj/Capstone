const mongoose = require('mongoose');
const dns = require('dns');

// Configure reliable DNS servers for MongoDB Atlas SRV record resolution on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if not permitted
}

let isMongoConnected = false;

const seedInitialDataIfEmpty = async () => {
  try {
    const User = require('../models/User');
    const Project = require('../models/Project');
    const Task = require('../models/Task');
    const bcrypt = require('bcryptjs');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[MongoDB Atlas] Seeding initial users and capstone tasks...');
      const adminUser = await User.create({
        name: 'ICTAK Lead Admin',
        email: 'admin@ictak.org',
        password: 'admin123', // Will be hashed by User pre-save hook
        role: 'admin',
        avatar: 'A'
      });

      const internUser = await User.create({
        name: 'ICTAK Intern Developer',
        email: 'intern@ictak.org',
        password: 'intern123', // Will be hashed by User pre-save hook
        role: 'user',
        avatar: 'I'
      });

      const proj1 = await Project.create({
        title: 'Full Stack MERN Capstone',
        description: 'Core project tracking web portal for ICT Academy of Kerala Internship.',
        category: 'Development',
        status: 'Active',
        deadline: new Date(Date.now() + 7 * 24 * 3600 * 1000),
        owner: internUser._id
      });

      const proj2 = await Project.create({
        title: 'Cloud Deployment & DevOps Pipeline',
        description: 'Setting up continuous deployment and environment configurations.',
        category: 'Research',
        status: 'Planning',
        deadline: new Date(Date.now() + 14 * 24 * 3600 * 1000),
        owner: internUser._id
      });

      await Task.create([
        {
          title: 'Design Software Requirements Specification (SRS)',
          description: 'Detail functional and non-functional requirements, user stories, and API contract.',
          project: proj1._id,
          priority: 'High',
          status: 'Completed',
          dueDate: new Date(Date.now() - 1 * 24 * 3600 * 1000),
          user: internUser._id,
          tags: ['Documentation', 'SRS', 'ICTAK']
        },
        {
          title: 'Implement Express REST API with JWT Auth',
          description: 'Construct controllers, route guards, bcrypt password hashing, and error middleware.',
          project: proj1._id,
          priority: 'Urgent',
          status: 'In Progress',
          dueDate: new Date(Date.now() + 2 * 24 * 3600 * 1000),
          user: internUser._id,
          tags: ['Backend', 'Security', 'JWT']
        },
        {
          title: 'Build React Vite Single Page App with 4 UI States',
          description: 'Create responsive UI screens handling Loading, Success, Empty, and Error states.',
          project: proj1._id,
          priority: 'High',
          status: 'In Progress',
          dueDate: new Date(Date.now() + 4 * 24 * 3600 * 1000),
          user: internUser._id,
          tags: ['Frontend', 'React', 'UI/UX']
        },
        {
          title: 'Prepare Final Submission Report & Git Screenshots',
          description: 'Document architecture, API test verification, and complete ICTAK checklist.',
          project: proj1._id,
          priority: 'Medium',
          status: 'Pending',
          dueDate: new Date(Date.now() + 6 * 24 * 3600 * 1000),
          user: internUser._id,
          tags: ['Report', 'Submission']
        }
      ]);
      console.log('[MongoDB Atlas] Seed data successfully populated into cloud database!');
    }
  } catch (seedErr) {
    console.warn('[MongoDB Atlas Seed Warning]', seedErr.message);
  }
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasktrack_capstone';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB Atlas] Connected successfully to Cloud Cluster!`);
    await seedInitialDataIfEmpty();
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB server: ${error.message}`);
    console.log(`[MongoDB Fallback] Server will operate seamlessly using high-speed In-Memory Data Store with default seed accounts.`);
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = { connectDB, getMongoStatus };
