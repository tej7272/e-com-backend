const express = require('express');

const router = express.Router();
const configurationRoutes = require('./configuration')
const authRoutes = require("./auth");
const { verifyToken } = require('../../middlewares/verifyToken');


router.use("/auth", authRoutes);
router.use(verifyToken);
router.use("/configuration", configurationRoutes);


module.exports = router;