const asyncHandler = require('express-async-handler')
const Color        = require('../../../models/configuration/color')
const Product      = require('../../../models/productModel')


// ─── Get Colors ───────────────────────────────────────────────
const getColors = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const [colors, total] = await Promise.all([
    Color.find()
      .lean()
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Color.countDocuments()
  ])

  res.status(200).json({
    success: true,
    data:    colors,
    total,
    page:    Number(page),
    pages:   Math.ceil(total / limit),
  })
})


// ─── Create Color ─────────────────────────────────────────────
const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body

  const exists = await Color.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') }
  })
  if (exists) {
    res.status(409)
    throw new Error('Color with this name already exists')
  }

  const color = await Color.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Color created successfully',
    data:    color,
  })
})


// ─── Update Color ─────────────────────────────────────────────
const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body

  // ✅ check exists first
  const color = await Color.findById(req.params.id)
  if (!color) {
    res.status(404)
    throw new Error('Color not found')   // ✅ was "Brand not found" — copy paste bug
  }

  // ✅ then check duplicate
  const duplicate = await Color.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    _id:  { $ne: req.params.id }
  })
  if (duplicate) {
    res.status(409)
    throw new Error('Color with this name already exists')
  }

  const updated = await Color.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).lean()

  res.status(200).json({
    success: true,
    message: 'Color updated successfully',  // ✅ was "Brand updated" — copy paste bug
    data:    updated,
  })
})


// ─── Delete Color ─────────────────────────────────────────────
const deleteColor = asyncHandler(async (req, res) => {

  // ✅ check exists first
  const color = await Color.findById(req.params.id)
  if (!color) {
    res.status(404)
    throw new Error('Color not found')
  }

  // ✅ check in use by color not brand
  const inUse = await Product.findOne({ color: req.params.id })  // ✅ was brand — copy paste bug
  if (inUse) {
    res.status(400)
    throw new Error('Color is in use and cannot be deleted')
  }

  await Color.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Color deleted successfully',
  })
})


module.exports = { getColors, createColor, updateColor, deleteColor }