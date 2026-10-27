const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getMongoStatus } = require('../config/db');
const { users, generateId } = require('../config/memoryStore');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'ictak_super_secret_capstone_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (getMongoStatus()) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password,
        role: role === 'admin' ? 'admin' : 'user',
        avatar: name.trim().charAt(0).toUpperCase()
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          token: generateToken(user._id)
        }
      });
    } else {
      const existingUser = users.find(u => u.email === cleanEmail);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: generateId(),
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: role === 'admin' ? 'admin' : 'user',
        avatar: name.trim().charAt(0).toUpperCase(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      users.push(newUser);

      return res.status(201).json({
        success: true,
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          token: generateToken(newUser._id)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (getMongoStatus()) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || user.name.charAt(0).toUpperCase(),
          token: generateToken(user._id)
        }
      });
    } else {
      const user = users.find(u => u.email === cleanEmail);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || user.name.charAt(0).toUpperCase(),
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
