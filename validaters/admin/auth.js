// validators/auth.validator.js
const { z } = require('zod')

// ─── Login ────────────────────────────────────────────────────
const loginSchema = z.object({
  email:    z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

// ─── OTP ──────────────────────────────────────────────────────
const otpSchema = z.object({
  email: z.string().email('Invalid email'),
  otp:   z.string().length(6, 'OTP must be 6 digits'),
})

// ─── Forgot Password ──────────────────────────────────────────
const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
})

// ─── Reset Password ───────────────────────────────────────────
const resetPasswordSchema = z.object({
  token:       z.string().min(1, 'Token is required'),
  newPassword: z.string()
    .min(8,  'Password must be at least 8 characters')
    .regex(/[A-Z]/,       'Must contain at least one uppercase letter')
    .regex(/[a-z]/,       'Must contain at least one lowercase letter')
    .regex(/[0-9]/,       'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
})

module.exports = { loginSchema, otpSchema, forgotPasswordSchema, resetPasswordSchema }