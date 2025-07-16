const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models/dbModels');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Register new user
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 'fail', message: errors.array() });

    const { email, password, firstName, lastName, role = 'student' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ status: 'fail', message: 'User with this email already exists' });

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      passwordHash,
      role,
      profile: { firstName, lastName }
    });

    await user.save();

    const token = generateToken(user._id);
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      createdAt: user.createdAt
    };

    res.status(201).json({ status: 'success', data: { user: userResponse, token } });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: 'fail', message: errors.array() });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });

    const token = generateToken(user._id);
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
      createdAt: user.createdAt
    };

    res.json({ status: 'success', data: { user: userResponse, token } });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.json({ status: 'success', data: { user } });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ status: 'fail', message: errors.array() });

    const { firstName, lastName, bio, avatarUrl } = req.body;

    const updateData = {
      'profile.firstName': firstName,
      'profile.lastName': lastName,
      updatedAt: new Date()
    };

    if (bio !== undefined) updateData['profile.bio'] = bio;
    if (avatarUrl !== undefined) updateData['profile.avatarUrl'] = avatarUrl;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({ status: 'success', data: { user } });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ status: 'fail', message: errors.array() });

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) res.status(404).json({ status: 'fail', message: 'User not found' });

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) res.status(400).json({ status: 'fail', message: 'Current password is incorrect' });

    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    user.passwordHash = newPasswordHash;
    user.updatedAt = new Date();
    await user.save();

    res.json({ status: 'success', message: 'Password changed successfully' });

  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
}; 