const asyncHandler = require('express-async-handler');
const Master = require('../models/masterModel');

// ✅ Helper function to get or create master
const getMasterDocument = async () => {
    let master = await Master.findOne();
    if (!master) {
        master = await Master.create({});
    }
    return master;
};

// ✅ Generic function for adding items (DRY principle)
const addMasterItem = (fieldName, shouldLowercase = true) => {
    return asyncHandler(async (req, res) => {
        const { key, label } = req.body;

        // Validate input
        if (!key || !label) {
            res.status(400);
            throw new Error("All fields are required");
        }

        // Sanitize input
        const sanitizedKey = shouldLowercase ? key.trim().toLowerCase() : key.trim();
        const sanitizedLabel = label.trim();

        if (!sanitizedKey || !sanitizedLabel) {
            res.status(400);
            throw new Error("Key and label cannot be empty");
        }

        const master = await getMasterDocument();

        // Check if item already exists
        const isPresent = master[fieldName].some((item) => item.key === sanitizedKey);
        if (isPresent) {
            res.status(409);
            throw new Error(`${fieldName} already exists`);
        }

        // Add new item
        master[fieldName].push({ key: sanitizedKey, label: sanitizedLabel });
        await master.save();

        res.status(201).json({
            status: true,
            message: `${fieldName} added successfully`,
        });
    });
};

// ✅ Generic update function
const updateMasterItem = (fieldName) => {
    return asyncHandler(async (req, res) => {
        const { key, label } = req.body;
        const { id } = req.params;

        if (!id){
            res.status(400);
            throw new Error("Invalid request! Please check the id");
        }

        if (!key || !label) {
            res.status(400);
            throw new Error("Key and new label are required");
        }

        const master = await getMasterDocument();

        const item = master[fieldName].find((item) => item.id === id);

        if (!item) {
            res.status(404);
            throw new Error(`${fieldName} not found`);
        }

        item.label = label.trim();
        await master.save();

        res.status(200).json({
            status: true,
            message: `${fieldName} updated successfully`,
        });
    });
};

// ✅ Generic delete function
const deleteMasterItem = (fieldName) => {
    return asyncHandler(async (req, res) => {
        const { id } = req.params;

        if (!id) {
            res.status(400);
            throw new Error("Invalid request! Please check the id");
        }

        const master = await getMasterDocument();

        const initialLength = master[fieldName].length;
        master[fieldName] = master[fieldName].filter(
            (item) => item.id !== id
        );

        if (master[fieldName].length === initialLength) {
            res.status(404);
            throw new Error(`${fieldName} not found`);
        }

        await master.save();

        res.status(200).json({
            status: true,
            message: `${fieldName} deleted successfully`
        });
    });
};


// ✅ Get Master
const getMaster = asyncHandler(async (req, res) => {
    let master = await Master.findOne().lean();
    
    if (!master) {
        const newMaster = await Master.create({});
        master = newMaster.toObject();
    }
    
    res.status(200).json(master);
});

// ✅ Add Size (nested under category)
const addSize = asyncHandler(async (req, res) => {
    const { key, label, categoryId } = req.body;

    if (!key || !label || !categoryId
    ) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const sanitizedKey = key.trim();
    const sanitizedLabel = label.trim();

    if (!sanitizedKey || !sanitizedLabel) {
        res.status(400);
        throw new Error("Fields cannot be empty");
    }

    const master = await getMasterDocument();

     // Check if item already exists
    const isPresent = master.sizes.some((item) => item.key === sanitizedKey);
    if (isPresent) {
        res.status(409);
        throw new Error(`$Sizes already exists`);
    }

    // Add new item
    master.sizes.push({ key: sanitizedKey, label: sanitizedLabel, categoryId});
    await master.save();

    res.status(201).json({
        status: true,
        message: "Size added successfully",
    });
});

const updateSize = asyncHandler(async (req, res) => {
    const { key, label, categoryId } = req.body;
        const { id } = req.params;

        if (!id){
            res.status(400);
            throw new Error("Invalid request! Please check the id");
        }

        if (!key || !label || !categoryId) {
            res.status(400);
            throw new Error("Key, label and category are required");
        }

        const master = await getMasterDocument();

        const item = master.sizes.find((item) => item.id === id);

        if (!item) {
            res.status(404);
            throw new Error(`Size not found`);
        }

        item.label = label.trim();
        item.categoryId = categoryId;
        await master.save();

        res.status(200).json({
            status: true,
            message: `Size updated successfully`,
        });
});

// Use generic function for simple fields
const addBrand = addMasterItem('brands', true);
const addGender = addMasterItem('gender', true);
const addColor = addMasterItem('colors', true);
const addCategory = addMasterItem('categories', true);
const addOrderStatus = addMasterItem('orderStatus', false);


// Export update functions
const updateBrand = updateMasterItem('brands');
const updateGender = updateMasterItem('gender');
const updateColor = updateMasterItem('colors');
const updateCategory = updateMasterItem('categories');
const updateOrderStatus = updateMasterItem('orderStatus');



const deleteBrand = deleteMasterItem('brands');
const deleteGender = deleteMasterItem('gender');
const deleteCategory = deleteMasterItem('categories');
const deleteColor = deleteMasterItem('colors');
const deleteOrderStatus = deleteMasterItem('orderStatus');
const deleteSize = deleteMasterItem('sizes');


module.exports = {
    getMaster,
    addCategory,
    addBrand,
    addGender,
    addColor,
    addOrderStatus,
    addSize,
    updateBrand,
    updateColor,
    updateSize,
    updateCategory,
    updateGender,
    updateOrderStatus,
    deleteBrand,
    deleteGender,
    deleteCategory,
    deleteColor,
    deleteOrderStatus,
    deleteSize
};