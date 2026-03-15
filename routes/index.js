const express = require('express');

const router = express.Router();
const adminRoutes = require('./admin/index');
const formConfigRoute = require('./formConfig');
const { verifyToken } = require('../middlewares/verifyToken');


router.use("/admin", adminRoutes)
router.use("/admin", verifyToken, formConfigRoute)


module.exports = router;