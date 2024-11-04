// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const auth = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;