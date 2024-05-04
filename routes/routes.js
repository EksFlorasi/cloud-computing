const express = require('express');
const multer = require('multer');
const {
  userSignUp,
  getCollection,
  userLogin,
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

// User Sign Up
router.post('/auth/signup', userSignUp);

// User Login
router.post('/auth/login', userLogin);

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

// Load testing using Loader.io
router.get('/loaderio-9a54c0b86e1150557230a3c0b1be8b83', function(req, res) { 
  res.status(200).send('loaderio-9a54c0b86e1150557230a3c0b1be8b83');
});

module.exports = { router };
