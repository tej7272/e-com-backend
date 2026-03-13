const express = require('express');
const router = express.Router();

const { validate } = require('../middlewares/validationHandler');
const { brandSchema } = require('../validaters/configuration/brand');
const { categorySchema } = require('../validaters/configuration/category');
const { sizeGroupSchema } = require('../validaters/configuration/sizeGroup');
const { subCategorySchema } = require('../validaters/configuration/subCategory');

const { getBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/configuration/brand');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/configuration/category');
const { getSizeGroups, createSizeGroup, deleteSizeGroup, updateSizeGroup } = require('../controllers/configuration/sizeGroup');
const { getSubcategories, createSubCategory, updateSubCategory, deleteSubCategeory } = require('../controllers/configuration/subCategory');


// Routers for the category
router.route("/category").get(getCategories).post(validate(categorySchema), createCategory);
router.route("/category/:id").patch(validate(categorySchema), updateCategory).delete(deleteCategory);


// Routers for the size group
router.route("/size-group").get(getSizeGroups).post(validate(sizeGroupSchema), createSizeGroup);
router.route("/size-group/:id").patch(validate(sizeGroupSchema), updateSizeGroup).delete(deleteSizeGroup);


// Routers for the sub category
router.route("/sub-category").get(getSubcategories).post(validate(subCategorySchema), createSubCategory);
router.route("/sub-category/:id").patch(validate(subCategorySchema), updateSubCategory).delete(deleteSubCategeory);


// Routers for the brands
router.route("/brand").get(getBrands).post(validate(brandSchema), createBrand);
router.route("/brand/:id").patch(validate(brandSchema), updateBrand).delete(deleteBrand);



module.exports = router;