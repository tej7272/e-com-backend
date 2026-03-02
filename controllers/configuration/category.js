const asyncHandler = require('express-async-handler');
const Category = require('../../models/configuration/category');

const getCategories = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const categories = await Category.find()
        .lean()
        .skip((page - 1) * limit)
        .limit(Number(limit));
    const total = await Category.countDocuments();
    res.status(200).json({ status: true, data: categories, total, page: Number(page) });
});

const addCategory = asyncHandler(async (req, res) => {
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();
    const { isActive } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Name is required");
    }

    const exists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
        res.status(409);
        throw new Error("Category already exists");
    }

    const category = await Category.create({ name, isActive, description });
    res.status(201).json({ status: true, message: "Category added successfully", data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();
    const { isActive } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Name is required");
    }

    const updated = await Category.findByIdAndUpdate(
        req.params.id,
        { name, isActive, description },
        { new: true, runValidators: true }
    );

    if (!updated) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json({ status: true, message: "Category updated successfully", data: updated });
});

const deleteCategory = asyncHandler(async (req, res) => {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json({ status: true, message: "Category deleted successfully" });
});

module.exports = { getCategories, addCategory, updateCategory, deleteCategory };