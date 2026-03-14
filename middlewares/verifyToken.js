// middlewares/auth.middleware.js
const jwt   = require('jsonwebtoken')
const Admin = require('../models/auth/adminAuth')

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401)
    throw new Error('No token provided')
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    res.status(403)
    throw new Error('Invalid or expired token')
  }

  req.admin = await Admin.findById(decoded.id)
  if (!req.admin) {
    res.status(401)
    throw new Error('Admin no longer exists')
  }

  if (!req.admin.isActive) {
    res.status(403)
    throw new Error('Account is disabled')
  }

  next()
}

module.exports = { verifyToken }