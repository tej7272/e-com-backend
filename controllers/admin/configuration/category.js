
const asyncHandler = require('express-async-handler');
const Category = require('../../../models/configuration/category');
const Product = require('../../../models/productModel');

const getCategories = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10 } = req.query;
    const categories = await Category.find()
        .lean()
        // .skip((page - 1) * limit)
        // .limit(Number(limit));
    const total = await Category.countDocuments();
    res.status(200).json({ status: true, data: categories, total });
});

const createCategory = asyncHandler(async (req, res) => {

    const name = req.body.name
    const exists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
        res.status(409);
        throw new Error("Category with this name already exists");
    }

    const category = await Category.create(req.body);
    res.status(201).json({ status: true, message: "Category created successfully", data: category });
});



const updateCategory = asyncHandler(async (req, res) => {

    const name = req.body.name;
    const duplicate = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id } 
    });
    if (duplicate) {
        res.status(409);
        throw new Error("Category with this name already exists");
    }

    const updated = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    ).lean();
    if (!updated) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({ status: true, message: "Category updated successfully", data: updated });
});


const deleteCategory = asyncHandler(async (req, res) => {

    const inUse = await Product.findOne({ category: req.params.id });
    if (inUse) {
        res.status(400);
        throw new Error("Category is in use and cannot be deleted");
    }

    const deleted = await Category.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json({ status: true, message: "Category deleted successfully" });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };