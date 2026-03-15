const asyncHandler  = require('express-async-handler')
const SubCategory   = require('../../../models/configuration/subCategory')
const Product       = require('../../../models/productModel')  // ✅ add for inUse check


// ─── Get Sub Categories ───────────────────────────────────────
const getSubCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const [subCategories, total] = await Promise.all([
    SubCategory.find()
      .populate('category',  'name')
      .populate('sizeGroup', 'name sizes')
      .lean()
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    SubCategory.countDocuments()
  ])

  res.status(200).json({
    success: true,
    message: 'Sub categories fetched successfully',
    data:    subCategories,
    total,
    page:    Number(page),
    pages:   Math.ceil(total / limit),
  })
})


// ─── Create Sub Category ──────────────────────────────────────
const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body

  const exists = await SubCategory.findOne({
    name:     { $regex: new RegExp(`^${name}$`, 'i') },
    category: category,
  })
  if (exists) {
    res.status(409)
    throw new Error('Sub category with this name already exists in this category')
  }

  const subCategory = await SubCategory.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Sub category created successfully',
    data:    subCategory,
  })
})


// ─── Update Sub Category ──────────────────────────────────────
const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body

  // ✅ check exists first
  const subCategory = await SubCategory.findById(req.params.id)
  if (!subCategory) {
    res.status(404)
    throw new Error('Sub category not found')
  }

  // ✅ then check duplicate
  const duplicate = await SubCategory.findOne({
    name:     { $regex: new RegExp(`^${name}$`, 'i') },
    category: category,
    _id:      { $ne: req.params.id }
  })
  if (duplicate) {
    res.status(409)
    throw new Error('Sub category with this name already exists in this category')
  }

  const updated = await SubCategory.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  )
  .populate('category',  'name')
  .populate('sizeGroup', 'name sizes')
  .lean()

  res.status(200).json({
    success: true,
    message: 'Sub category updated successfully',
    data:    updated,
  })
})


// ─── Delete Sub Category ──────────────────────────────────────
const deleteSubCategory = asyncHandler(async (req, res) => {  // ✅ fixed typo

  // ✅ check exists first
  const subCategory = await SubCategory.findById(req.params.id)
  if (!subCategory) {
    res.status(404)
    throw new Error('Sub category not found')
  }

  // ✅ check in use
  const inUse = await Product.findOne({ subCategory: req.params.id })
  if (inUse) {
    res.status(400)
    throw new Error('Sub category is in use and cannot be deleted')
  }

  await SubCategory.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Sub category deleted successfully',
  })
})


module.exports = {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory, 
}