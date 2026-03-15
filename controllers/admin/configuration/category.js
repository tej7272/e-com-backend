const asyncHandler = require('express-async-handler')
const Category     = require('../../../models/configuration/category')
const Product      = require('../../../models/productModel')


// ─── Get Categories ───────────────────────────────────────────
const getCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const [categories, total] = await Promise.all([  // ✅ parallel queries
    Category.find()
      .lean()
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Category.countDocuments()
  ])

  res.status(200).json({
    success: true,             // ✅ fixed
    data:    categories,
    total,
    page:    Number(page),
    pages:   Math.ceil(total / limit),
  })
})


// ─── Create Category ──────────────────────────────────────────
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  const exists = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') }
  })
  if (exists) {
    res.status(409)
    throw new Error('Category with this name already exists')
  }

  const category = await Category.create(req.body)

  res.status(201).json({
    success: true,             // ✅ fixed
    message: 'Category created successfully',
    data:    category,
  })
})


// ─── Update Category ──────────────────────────────────────────
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body

  // ✅ check exists first
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }

  // ✅ then check duplicate
  const duplicate = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    _id:  { $ne: req.params.id }
  })
  if (duplicate) {
    res.status(409)
    throw new Error('Category with this name already exists')
  }

  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).lean()

  res.status(200).json({
    success: true,             // ✅ fixed
    message: 'Category updated successfully',
    data:    updated,
  })
})


// ─── Delete Category ──────────────────────────────────────────
const deleteCategory = asyncHandler(async (req, res) => {

  // ✅ check exists first
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }

  // ✅ then check in use
  const inUse = await Product.findOne({ category: req.params.id })
  if (inUse) {
    res.status(400)
    throw new Error('Category is in use and cannot be deleted')
  }

  await Category.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,             // ✅ fixed
    message: 'Category deleted successfully',
  })
})


module.exports = { getCategories, createCategory, updateCategory, deleteCategory }