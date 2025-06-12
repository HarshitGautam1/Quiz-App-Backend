const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { unauthorizedResponse, forbiddenResponse, errorResponse } = require('../utils/responseHandler');

// ✅ Middleware: Authenticate user
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // format: Bearer <token>

    if (!token) return unauthorizedResponse(res, "Token missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (!req.user) return unauthorizedResponse(res, "User not found");

    next();
  } catch (err) {
    return errorResponse(res, 401, "Invalid or expired token");
  }
};

// 🔐 Middleware: Admin-only access
const adminAuth = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return forbiddenResponse(res, "Admin access only");
  }
  next();
};

module.exports = { auth, adminAuth };
