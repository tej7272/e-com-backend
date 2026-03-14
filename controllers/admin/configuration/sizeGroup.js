const asyncHandler = require('express-async-handler');
const SizeGroup = require('../../../models/configuration/sizeGroup');
const Product = require('../../../models/productModel');


const getSizeGroups = asyncHandler( async (req, res) => {
    const sizeGroups = await SizeGroup.find().lean();
    const total = await SizeGroup.countDocuments();
    res.status(200).json({ status: true, data: sizeGroups, total });
})


const createSizeGroup = asyncHandler( async (req, res) => {

    const { name } = req.body;

    const exists = await SizeGroup.findOne({name: {$regex : new RegExp(`^${name}$`, 'i')}});
    if(exists){
        res.status(409);
        throw new Error("Size group already exists!")
    }

    const newSizeGroup = await SizeGroup.create(req.body);
    res.status(201).json({ status: true, message: "Size group successfully added", data: newSizeGroup });
})

const updateSizeGroup = asyncHandler( async (req, res) => {
    const {name} = req.body;
    const duplicate = await SizeGroup.findOne({
        name: {$regex: new RegExp(`^${name}$`, 'i')},
        _id: { $ne: req.params.id } 
    });
    if(duplicate){
        res.status(409);
        throw new Error("Size group with this name already exists!")
    }
    const updated = await SizeGroup.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    ).lean();
    if(!updated){
        res.status(404)
        throw new Error("Size group not found!");
    }
    res.status(200).json({status: true, message: "Size group successfully updated!", data: updated});
})


const deleteSizeGroup = asyncHandler( async (req, res) => {
    // const inUse = await Product.findOne({})

    const deleted = await SizeGroup.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404);
        throw new Error("Size group not found!");
    }
    res.status(200).json({status: true, message: "Size group deleted successfully!"})
})


module.exports = {
    getSizeGroups,
    createSizeGroup,
    updateSizeGroup,
    deleteSizeGroup
}