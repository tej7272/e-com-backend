const jwt          = require('jsonwebtoken')
const Admin        = require('../models/auth/adminAuth')
const asyncHandler = require('express-async-handler')

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token      = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401)
    throw new Error('No token provided')
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
  } catch (err) {
    res.status(401)
    throw new Error('Invalid or expired token')
  }

  const admin = await Admin
    .findById(decoded.id)
    .select('isActive name email role')

  if (!admin) {
    res.status(401)
    throw new Error('Admin no longer exists')
  }

  if (!admin.isActive) {
    res.status(403)
    throw new Error('Account is disabled')
  }

  req.admin = admin
  next()
})

module.exports = { verifyToken }