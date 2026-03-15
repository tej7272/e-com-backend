// middlewares/auth.middleware.js
const jwt          = require('jsonwebtoken')
const Admin        = require('../models/auth/adminAuth')
const asyncHandler = require('express-async-handler')

const verifyToken = asyncHandler(async (req, res, next) => {

  // 1. check token exists
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401)
    throw new Error('No token provided')
  }

  // 2. verify token
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    res.status(403)
    throw new Error('Invalid or expired token')
  }

  // 3. check admin exists
  req.admin = await Admin.findById(decoded.id)
  if (!req.admin) {
    res.status(401)
    throw new Error('Admin no longer exists')
  }

  // 4. check admin active
  if (!req.admin.isActive) {
    res.status(403)
    throw new Error('Account is disabled')
  }

  next()
})

module.exports = { verifyToken }