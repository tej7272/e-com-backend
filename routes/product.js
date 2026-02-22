const express = require('express');
const { getAllProducts, addProduct } = require('../controllers/productController');


const router = express.Router()


router.get('/product', getAllProducts)
router.post('/add-product', addProduct)

module.exports = router;