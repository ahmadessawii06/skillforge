const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * JWT Authentication Middleware
 */
function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Authorization header missing'
      });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        error: 'Authorization format invalid. Use: Bearer <token>'
      });
    }

    const [, token] = parts;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token missing'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }

    return res.status(403).json({
      success: false,
      error: 'Invalid token'
    });
  }
}


/**
 * Get token from token generation
 */
function generateToken(payload) {
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

module.exports = {
  authenticate,
  generateToken
};
