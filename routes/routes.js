const express = require('express');
const multer = require('multer');
const {
  registerUser,
  getCollection,
  userSignin,
  showRegions,
  getCollectionDetail,
  showAvatars,
  userProfile,
  userEditProfile,
  userDashboard,
  userRank,
  uploadCollection,
} = require('../controller/controllers');
const { authenticateToken } = require('../middleware/auth-jwt');

const router = express.Router();

// Show user list of regions
router.get('/references/locations', showRegions);

// Show user list of avatars
router.get('/references/avatars', showAvatars);

// Register user
router.post('/auth/register', registerUser);

// Login user
router.post('/auth/signin', userSignin);

// Get user profile
router.get('/profile', authenticateToken, userProfile);

// Edit user profile
router.put('/profile', authenticateToken, userEditProfile);

// Dashboard
router.get('/dashboard_information', authenticateToken, userDashboard);

// Rank
router.get('/rank', authenticateToken, userRank);

// Get Collection
router.get('/collections', authenticateToken, getCollection);

// Get Collection Detail
router.get('/collections/:object_id', authenticateToken, getCollectionDetail);

// Upload Collection
const upload = multer();
router.post('/collections', upload.single('picture'), authenticateToken, uploadCollection);

module.exports = { router };
