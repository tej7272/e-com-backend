const express        = require('express')
const { login, validateOtp, forgotPassword, resetPassword, getAdminInfo } = require('../../controllers/admin/auth/adminAuth')
const { verifyToken }  = require('../../middlewares/verifyToken')
// const { validate }     = require('../../middlewares/validate')
const { loginSchema, otpSchema, forgotPasswordSchema, resetPasswordSchema } = require('../../validaters/admin/auth')
const { validate } = require('../../middlewares/validationHandler')

const router = express.Router()

// ─── Public routes ────────────────────────────────────────────
router.post('/login', validate(loginSchema), login)
router.post('/validate', validate(otpSchema), validateOtp)
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', validate(resetPasswordSchema), resetPassword)

// ─── Protected routes ─────────────────────────────────────────
router.get('/user-info', verifyToken, getAdminInfo)

module.exports = router