const express = require('express');
const router = express.Router();

const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/configuration/category');

// Routers for the category
router.route("/category").get(getCategories).post(addCategory);
router.route("/category/:id").patch(updateCategory).delete(deleteCategory);




module.exports = router;