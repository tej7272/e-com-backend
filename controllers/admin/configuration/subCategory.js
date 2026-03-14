const asyncHandler = require('express-async-handler');

const SubCategory = require('../../../models/configuration/subCategory');

const getSubcategories = asyncHandler( async (req, res) => {
    const subCategory = await SubCategory.find().populate('category',  'name').populate('sizeGroup', 'name sizes').lean();
    const total = await SubCategory.countDocuments();
    res.status(200).json({status: true, message: "Sub-categories fetched successfully!", data: subCategory, total})
})

const createSubCategory = asyncHandler( async (req, res) => {
    const { name, category } = req.body;

    const exists = await SubCategory.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        category: category
    });

    if(exists){
        res.status(409);
        throw new Error("Sub category with this name already exists in this category");
    }

    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({status: true, message: "Sub category successfully added!", data: subCategory});

})

const updateSubCategory = asyncHandler( async(req, res) => {
    const {name, category} = req.body;

    const duplicate = await SubCategory.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        category: category,
        _id: {$ne: req.params.id}
    })

    if(duplicate){
        res.status(409);
        throw new Error("Sub category with this name already exists in this category");
    }

    const updated = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    ).populate('category',  'name').populate('sizeGroup', 'name sizes').lean();
    if(!updated){
        res.status(404)
        throw new Error("Sub-category not found!");
    }
    res.status(200).json({status: true, message: "Sub category updated successfully", data: updated})
});

const deleteSubCategeory = asyncHandler( async (req, res) => {
    const deleted = await SubCategory.findByIdAndDelete(req.params.id);
        if(!deleted){
            res.status(404);
            throw new Error("Sub category not found!");
        }
    res.status(200).json({status: true, message: "Sub category deleted successfully!"})
})

module.exports = {getSubcategories, createSubCategory, updateSubCategory, deleteSubCategeory}