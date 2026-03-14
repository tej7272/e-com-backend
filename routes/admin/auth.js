const express = require('express');
const { login, validateOtp } = require('../../controllers/admin/auth/adminAuth');

const router = express.Router();

router.post('/login', login);
router.post('/validate', validateOtp);


module.exports = router;