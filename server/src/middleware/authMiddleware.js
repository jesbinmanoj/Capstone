const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getMongoStatus } = require('../config/db');
const { users } = require('../config/memoryStore');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Token missing.'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'ictak_super_secret_capstone_jwt_key_2026'
    );

    if (getMongoStatus()) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists.'
        });
      }
      req.user = user;
    } else {
      const user = users.find(u => u._id.toString() === decoded.id.toString());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists in memory store.'
        });
      }
      const { password, ...userWithoutPass } = user;
      req.user = userWithoutPass;
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid or expired token.'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this resource.`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
