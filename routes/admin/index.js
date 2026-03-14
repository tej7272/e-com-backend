const express = require('express');

const router = express.Router();
const configurationRoutes = require('./configuration')
const authRoutes = require("./auth");


router.use("/auth", authRoutes);
router.use("/configuration", configurationRoutes);


module.exports = router;