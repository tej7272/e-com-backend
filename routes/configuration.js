const express = require('express');
const router = express.Router();

const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/configuration/category');
const { categorySchema } = require('../validaters/configuration/category');
const { validate } = require('../middlewares/validationHandler');

// Routers for the category
router.route("/category").get(getCategories).post(validate(categorySchema), addCategory);
router.route("/category/:id").patch(validate(categorySchema), updateCategory).delete(deleteCategory);




module.exports = router;