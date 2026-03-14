const express = require('express');

const router = express.Router();
const adminRoutes = require('./admin/index');
const formConfigRoute = require('./formConfig')


router.use("/admin", adminRoutes)
router.use("/admin", formConfigRoute)


module.exports = router;