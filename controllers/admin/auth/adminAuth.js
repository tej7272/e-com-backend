// controllers/auth/adminAuth.controller.js

const asyncHandler = require('express-async-handler')
const Admin = require('../../../models/auth/adminAuth')
const generateToken = require('../../../utils/generateToken')
const sendEmail = require('../../../utils/sendEmail')
const crypto = require('crypto')

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000))


// ─── Login ────────────────────────────────────────────────────
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin
    .findOne({ email })
    .select('+password +otp +otpExpiry')

  if (!admin) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  if (!admin.isActive) {
    res.status(403)
    throw new Error('Account is disabled')
  }

  if (admin.isLocked()) {
    res.status(423)
    throw new Error('Account locked. Try again in 30 minutes')
  }

  const isMatch = await admin.comparePassword(password)
  if (!isMatch) {
    await admin.incrementFailedAttempts()
    res.status(401)
    throw new Error('Invalid email or password')
  }

  await admin.resetFailedAttempts()

  const otp       = generateOtp()
  admin.otp       = otp
  admin.otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
  await admin.save()

  await sendEmail({
    to:      admin.email,
    subject: 'Your login OTP',
    html:    `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
  })

  res.status(200).json({
    success: true,
    message: 'OTP sent to your email',
    email:   admin.email,
  })
})


// ─── Validate OTP ─────────────────────────────────────────────
const validateOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body

  const admin = await Admin
    .findOne({ email })
    .select('+otp +otpExpiry')

  // ✅ 401 — don't reveal if admin exists
  if (!admin) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  if (!admin.otp || !admin.otpExpiry) {
    res.status(400)
    throw new Error('No OTP requested')
  }

  if (admin.otpExpiry < Date.now()) {
    res.status(400)
    throw new Error('OTP has expired')
  }

  if (admin.otp !== otp) {
    res.status(400)
    throw new Error('Invalid OTP')
  }

  admin.otp       = null
  admin.otpExpiry = null
  await admin.save()

  const token = generateToken({ id: admin._id, role: admin.role })

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    admin: {
      id:    admin._id,
      name:  admin.name,
      email: admin.email,
      role:  admin.role,
    },
  })
})


// ─── Forgot Password ──────────────────────────────────────────
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const admin = await Admin.findOne({ email })

  // ✅ always same message — don't reveal if email exists
  if (!admin) {
    return res.status(200).json({
      success: true,
      message: 'If this email exists, a reset link has been sent',
    })
  }

  const resetToken       = crypto.randomBytes(32).toString('hex')
  admin.resetToken       = resetToken
  admin.resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000)
  await admin.save()

  const resetLink = `${process.env.FRONTEND_URL}/admin/auth/reset-password?token=${resetToken}`

  await sendEmail({
    to:      admin.email,
    subject: 'Password reset request',
    html:    `
      <p>You requested a password reset.</p>
      <p>Click below to reset your password. Expires in 30 minutes.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you didn't request this, ignore this email.</p>
    `,
  })

  res.status(200).json({
    success: true,
    message: 'If this email exists, a reset link has been sent',
  })
})


// ─── Reset Password ───────────────────────────────────────────
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body

  const admin = await Admin
    .findOne({
      resetToken:       token,
      resetTokenExpiry: { $gt: Date.now() },
    })
    .select('+resetToken +resetTokenExpiry')

  if (!admin) {
    res.status(400)
    throw new Error('Invalid or expired reset token')
  }

  admin.password         = newPassword
  admin.resetToken       = null
  admin.resetTokenExpiry = null
  await admin.save()

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
  })
})


// ─── Get Admin Info ───────────────────────────────────────────
const getAdminInfo = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin info fetched',
    admin: {
      id:    req.admin._id,
      name:  req.admin.name,
      email: req.admin.email,
      role:  req.admin.role,
    }
  })
})


module.exports = { login, validateOtp, forgotPassword, resetPassword, getAdminInfo }