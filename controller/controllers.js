const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { generateAccessToken } = require('../middleware/auth-jwt');
const sequelize = require('../config/database');
// const formatDate = require('../middleware/date');
const {
  user,
  location,
  avatar,
  object,
  action_type,
  tip,
} = require('../config/database').models;

// Show list of regions in Indonesia
const showRegions = async (req, res) => {
  const locationList = await location.findAll({
    raw: true,
    attributes: ['location_id', 'location_name'],
  });

  res.send({ locations: locationList });
};

// Show list of avatars
const showAvatars = async (req, res) => {
  const avatarList = await avatar.findAll({
    raw: true,
    attributes: ['avatar_id', 'avatar_url'],
  });

  res.send({ avatars: avatarList });
};

// User registration
const registerUser = async (req, res) => {
  // Check if there's an empty field
  if (!req.body.name
    || !req.body.email
    || !req.body.password
    || !req.body.confirm
    || !req.body.location_id) return res.status(400).json({ msg: 'All fields should not be empty' });

  // Check if the email is already in use
  const emailUsed = await user.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (emailUsed.length !== 0) return res.status(400).json({ msg: 'Email is already in use!' });

  // Check if password and confirm password match
  if (req.bodypassword !== req.bodyconfirm) return res.status(400).json({ msg: 'Password and Confirm Password should match' });

  // Hash password
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  // Insert User credentials in database
  try {
    const userExist = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
      location_id: req.body.location_id,
    });
    if (userExist) {
      // Find the user id in database
      const userInfo = await user.findOne({
        raw: true,
        where: {
          email: req.body.email,
        },
      });

      // Generate token
      const token = generateAccessToken(userInfo);
      return res.status(201).json({ msg: 'Successfully registered', token });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

// User login
const userSignin = async (req, res) => {
  // Check if email or password fields are empty
  if (req.body.email.trim() === '' || req.body.password.trim() === '') return res.status(400).json({ msg: 'Email or password must not be empty' });

  // Check if the user with that email exists
  const userData = await user.findOne({
    raw: true,
    where: {
      email: req.body.email,
    },
  });

  if (!userData) return res.status(400).json({ msg: 'Email is incorrect' });

  // Check password
  const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
  if (passwordMatch === false) return res.status(401).send({ msg: 'Email or Password is incorrect' });

  // Generate token
  const token = generateAccessToken(userData);
  return res.status(200).json({ msg: 'Logged in successfully', token });
};

// Get user profile
const userProfile = async (req, res) => {
  // Find the user data from token
  const getUser = await user.findOne({
    raw: true,
    attributes: [
      'user_id', 'name', 'email', 'avatar_id', 'location_id',
    ],
    where: {
      user_id: req.user.user_id,
    },
    include: [
      {
        model: avatar,
        attributes: ['avatar_url'],
        where: { avatar_id: req.user.avatar_id },
      },
      {
        model: location,
        attributes: ['location_name'],
        where: { location_id: req.user.location_id },
      },
    ],
  });

  res.send({ profile: getUser });
};

// Edit user profile
const userEditProfile = async (req, res) => {
  // Check if any fields are empty
  if (!req.body.name
    || !req.body.email
    || !req.body.avatar_id
    || !req.body.location_id) return res.status(400).json({ msg: 'All fields should not be empty' });

  // Check if email is already in database and not the previous email address
  const checkEmail = await user.findOne({
    raw: true,
    where: {
      email: req.body.email,
    },
  });

  if (checkEmail.length !== 0 && checkEmail.user_id !== req.user.user_id) return res.status(403).json({ msg: 'Cannot edit email' });

  // Find the user data from token
  const updateUser = await user.update(
    {
      name: req.body.name,
      email: req.body.email,
      avatar_id: req.body.avatar_id,
      location_id: req.body.location_id,
    },
    {
      where: { user_id: req.user.user_id },
    },
  );

  // Check if email is already updated
  if (updateUser) {
    const updatedUser = await user.findOne({
      raw: true,
      where: { user_id: req.user.user_id },
    });
    const newToken = generateAccessToken(updatedUser);
    res.status(200).json({ msg: 'User updated', newToken });
  } else {
    res.status(400).json({ msg: 'User is not updated' });
  }
};

// Dashboard
const userDashboard = async (req, res) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const now = new Date();

  // Show user's points today
  const userPoints = await action_type.findAll({
    raw: true,
    attributes: [[sequelize.fn('SUM', sequelize.col('point_value')), 'pointCount']],
    include: {
      model: user,
      where: { user_id: req.user.user_id },
      attributes: [],
      through: {
        attributes: [],
        where: {
          created_at: {
            [Op.gte]: todayDate,
            [Op.lte]: now,
          },
        },
      },
    },
  });

  // Show user's total points and rank
  const [results, metadata] = await sequelize.query(
    `SELECT u.user_id, u.name, act.total_point
    FROM user u LEFT JOIN 
      (SELECT ac.user_id, SUM(at.point_value) as total_point
      FROM action_completed ac
      LEFT JOIN action_type at
      ON ac.action_id = at.action_id
      WHERE DATE(ac.created_at) BETWEEN 
      CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
      AND CURDATE() + INTERVAL (6 - WEEKDAY(CURDATE())) DAY
      GROUP BY ac.user_id) AS act
    ON u.user_id = act.user_id
    WHERE u.location_id = ${req.user.location_id}
    ORDER BY act.total_point DESC;`,
  );

  let rank = null;
  let userInformation = null;
  for (let i = 0; i < results.length; i++) {
    if (results[i].user_id === req.user.user_id) {
      rank = i + 1;
      userInformation = results[i];
    }
  }

  // Show user's streak
  const userStreak = await user.findOne({
    raw: true,
    attributes: ['streak'],
    where: { user_id: req.user.user_id },
  });

  // Show Flor's Tip of the Day
  const florTip = await tip.findAll({
    order: sequelize.literal('rand()'),
    limit: 1,
    raw: true,
    attributes: ['tip_desc'],
  });

  console.log(florTip);

  res.send({
    userPoints: userPoints[0].pointCount,
    rank,
    ...userInformation,
    userStreak: userStreak.streak,
    florTip: florTip[0].tip_desc,
  });
};

// Rank
const userRank = async (req, res) => {
  // Show user's total points and rank
  const [results, metadata] = await sequelize.query(
    `SELECT u.user_id, u.name, act.total_point
    FROM user u LEFT JOIN 
      (SELECT ac.user_id, SUM(at.point_value) as total_point
      FROM action_completed ac
      LEFT JOIN action_type at
      ON ac.action_id = at.action_id
      WHERE DATE(ac.created_at) BETWEEN 
      CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
      AND CURDATE() + INTERVAL (6 - WEEKDAY(CURDATE())) DAY
      GROUP BY ac.user_id) AS act
    ON u.user_id = act.user_id
    WHERE u.location_id = ${req.user.location_id}
    ORDER BY act.total_point DESC;`,
  );

  // Highlight user
  for (let data of results) {
    if (data.id == req.user_id) data.highlight = true
    else data.highlight = false
    delete data.id
  }

  res.send({ rank: results });
};

// Get collection
const getCollection = async (req, res) => {
  // Get the parameter from the url
  const { category } = req.query;

  // Get all collection associated with user
  const collectionList = await object.findAll({
    raw: true,
    attributes: ['object_id', 'mini_picture_url', 'name'],
    where: { type: category },
    include: {
      model: user,
      attributes: [],
      where: { user_id: req.user.user_id },
      through: { attributes: [] },
    },
  });

  // If user doesn't have any collection yet
  if (collectionList.length === 0) return res.json({ msg: 'There\'s nothing here yet...' });

  res.send(collectionList);
};

// Get collection detail
const getCollectionDetail = async (req, res) => {
  // Get all collection associated with user
  const collectionDetail = await object.findAll({
    raw: true,
    attributes: ['object_id', 'full_picture_url', 'name', 'latin', 'short_desc', 'fun_fact'],
    where: {
      object_id: req.params.object_id,
    },
    include: {
      model: user,
      attributes: [],
      where: { user_id: req.user.user_id },
      through: { attributes: [] },
    },
  });

  res.send(collectionDetail);
};

module.exports = {
  showRegions,
  showAvatars,
  registerUser,
  userSignin,
  userProfile,
  userEditProfile,
  userDashboard,
  userRank,
  getCollection,
  getCollectionDetail,
};
