const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validationHandler');
const { categorySchema } = require('../validaters/configuration/category');
const { sizeGroupSchema } = require('../validaters/configuration/sizeGroup');

const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/configuration/category');
const { getSizeGroups, createSizeGroup, deleteSizeGroup, updateSizeGroup } = require('../controllers/configuration/sizeGroup');

// Routers for the category
router.route("/category").get(getCategories).post(validate(categorySchema), addCategory);
router.route("/category/:id").patch(validate(categorySchema), updateCategory).delete(deleteCategory);


// Routers for the size group
router.route("/size-group").get(getSizeGroups).post(validate(sizeGroupSchema), createSizeGroup);
router.route("/size-group/:id").patch(validate(sizeGroupSchema), updateSizeGroup).delete(deleteSizeGroup);




module.exports = router;