const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT Token Generation
module.exports.generateAccessToken = function generateAccessToken(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
  return token;
};

// JWT Authentication
module.exports.authenticateToken = async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ msg: 'Please authenticate' });

  return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Internal server error' });

    req.user = user;
    next();
  });
};
