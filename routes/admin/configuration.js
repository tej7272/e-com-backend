const express = require('express');
const router = express.Router();

const { validate } = require('../../middlewares/validationHandler');
const { brandSchema } = require('../../validaters/configuration/brand');
const { colorSchema } = require('../../validaters/configuration/color');
const { categorySchema } = require('../../validaters/configuration/category');
const { sizeGroupSchema } = require('../../validaters/configuration/sizeGroup');
const { subCategorySchema } = require('../../validaters/configuration/subCategory');

const { getColors, createColor, updateColor, deleteColor } = require('../../controllers/admin/configuration/color');
const { getBrands, createBrand, updateBrand, deleteBrand } = require('../../controllers/admin/configuration/brand');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../../controllers/admin/configuration/category');
const { getSizeGroups, createSizeGroup, deleteSizeGroup, updateSizeGroup } = require('../../controllers/admin/configuration/sizeGroup');
const { getSubcategories, createSubCategory, updateSubCategory, deleteSubCategeory } = require('../../controllers/admin/configuration/subCategory');


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


// Routers for the colors
router.route("/color").get(getColors).post(validate(colorSchema), createColor);
router.route("/color/:id").patch(validate(colorSchema), updateColor).delete(deleteColor);



module.exports = router;