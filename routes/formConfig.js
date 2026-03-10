const express = require('express');
const { 
   getFormConfig
} = require('../controllers/configuration/formConfig');

const router = express.Router();

router.get('/form-config', getFormConfig);


module.exports = router 