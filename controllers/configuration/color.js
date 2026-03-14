
const asyncHandler = require('express-async-handler');
const Color = require('../../models/configuration/color');
const Product = require('../../models/productModel');

const getColors = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10 } = req.query;
    const colors = await Color.find()
        .lean()
        // .skip((page - 1) * limit)
        // .limit(Number(limit));
    const total = await Color.countDocuments();
    res.status(200).json({ status: true, data: colors, total });
});

const createColor = asyncHandler(async (req, res) => {

    const name = req.body.name
    const exists = await Color.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
        res.status(409);
        throw new Error("Color with this name already exists");
    }

    const color = await Color.create(req.body);
    res.status(201).json({ status: true, message: "Color created successfully", data: color });
});



const updateColor = asyncHandler(async (req, res) => {

    const name = req.body.name;
    const duplicate = await Color.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id } 
    });
    if (duplicate) {
        res.status(409);
        throw new Error("Color with this name already exists");
    }

    const updated = await Color.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    ).lean();
    if (!updated) {
        res.status(404);
        throw new Error("Brand not found");
    }

    res.status(200).json({ status: true, message: "Brand updated successfully", data: updated });
});


const deleteColor = asyncHandler(async (req, res) => {

    const inUse = await Product.findOne({ brand: req.params.id });
    if (inUse) {
        res.status(400);
        throw new Error("Color is in use and cannot be deleted");
    }

    const deleted = await Color.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404);
        throw new Error("Color not found");
    }
    res.status(200).json({ status: true, message: "Color deleted successfully" });
});

module.exports = { getColors, createColor, updateColor, deleteColor };