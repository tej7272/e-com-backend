const express = require('express');
const { 
    getMaster, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    addBrand, 
    updateBrand, 
    deleteBrand, 
    addColor, 
    updateColor, 
    deleteColor, 
    addGender, 
    updateGender, 
    deleteGender, 
    addOrderStatus, 
    updateOrderStatus, 
    deleteOrderStatus, 
    addSize, 
    updateSize, 
    deleteSize, 
} = require('../controllers/masterController');

const router = express.Router();

router.get('/master', getMaster);

router.post('/master/addBrand', addBrand);
router.patch('/master/updateBrand/:id', updateBrand);
router.delete('/master/deleteBrand/:id', deleteBrand);

router.post('/master/addGender', addGender);
router.patch('/master/updateGender/:id', updateGender);
router.delete('/master/deleteGender/:id', deleteGender);

router.post('/master/addColor', addColor);
router.patch('/master/updateColor/:id', updateColor);
router.delete('/master/deleteColor/:id', deleteColor);

router.post('/master/addCategory', addCategory);
router.patch('/master/updateCategory/:id', updateCategory);
router.delete('/master/deleteCategory/:id', deleteCategory);

router.post('/master/addOrderStatus', addOrderStatus);
router.patch('/master/updateOrderStatus/:id', updateOrderStatus);
router.delete('/master/deleteOrderStatus/:id', deleteOrderStatus);

router.post('/master/addSize', addSize);
router.patch('/master/updateSize/:id', updateSize);
router.delete('/master/deleteSize/:id', deleteSize);


module.exports = router 