const router = require('express').Router()
const { 
    login,
    logout,
    validateOtp,
    getAdminInfo,
    refreshToken,
    resetPassword,
    forgotPassword,
 } = require('../../controllers/admin/auth/adminAuth')
const { verifyToken } = require('../../middlewares/verifyToken')

// public routes
router.post('/login', login)
router.post('/logout', logout)
router.post('/validate', validateOtp)
router.post('/refresh', refreshToken)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

// protected routes
router.get( '/user-info', verifyToken, getAdminInfo)

module.exports = router
