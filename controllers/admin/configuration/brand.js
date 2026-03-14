
const asyncHandler = require('express-async-handler');
const Brand = require('../../../models/configuration/brand');
const Product = require('../../../models/productModel');

const getBrands = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10 } = req.query;
    const brands = await Brand.find()
        .lean()
        // .skip((page - 1) * limit)
        // .limit(Number(limit));
    const total = await Brand.countDocuments();
    res.status(200).json({ status: true, data: brands, total });
});

const createBrand = asyncHandler(async (req, res) => {

    const name = req.body.name
    const exists = await Brand.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
        res.status(409);
        throw new Error("Brand with this name already exists");
    }

    const brand = await Brand.create(req.body);
    res.status(201).json({ status: true, message: "Brand created successfully", data: brand });
});



const updateBrand = asyncHandler(async (req, res) => {

    const name = req.body.name;
    const duplicate = await Brand.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id } 
    });
    if (duplicate) {
        res.status(409);
        throw new Error("Brand with this name already exists");
    }

    const updated = await Brand.findByIdAndUpdate(
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


const deleteBrand = asyncHandler(async (req, res) => {

    const inUse = await Product.findOne({ brand: req.params.id });
    if (inUse) {
        res.status(400);
        throw new Error("Brand is in use and cannot be deleted");
    }

    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404);
        throw new Error("Brand not found");
    }
    res.status(200).json({ status: true, message: "Brand deleted successfully" });
});

module.exports = { getBrands, createBrand, updateBrand, deleteBrand };