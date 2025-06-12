const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
  successResponse,
  createdResponse,
  errorResponse,
  unauthorizedResponse,
  badRequestResponse
} = require('../utils/responseHandler')

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registerUser = async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const { name, password, role} = req.body;
  if (!email || !password || !name) return badRequestResponse(res, 'Name , Email and password  are required');

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return badRequestResponse(res, 'User already registered. Please login.');
    }

    const user = await User.create({ name, email, password, role: role || 'user'});
    const token = generateToken(user._id);

  return createdResponse(res, {
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
}, "User registered successfully");
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const { password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return unauthorizedResponse(res, 'Invalid email or password');
    }
     const token = generateToken(user._id);
    return successResponse(res, {
      token,
      user: { id: user._id, name: user.name, email: user.email }
    }, "Login successful");


  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
