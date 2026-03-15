const asyncHandler = require('express-async-handler')
const SizeGroup    = require('../../../models/configuration/sizeGroup')
const Product      = require('../../../models/productModel')


// ─── Get Size Groups ──────────────────────────────────────────
const getSizeGroups = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const [sizeGroups, total] = await Promise.all([
    SizeGroup.find()
      .lean()
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    SizeGroup.countDocuments()
  ])

  res.status(200).json({
    success: true,
    data:    sizeGroups,
    total,
    page:    Number(page),
    pages:   Math.ceil(total / limit),
  })
})


// ─── Create Size Group ────────────────────────────────────────
const createSizeGroup = asyncHandler(async (req, res) => {
  const { name } = req.body

  const exists = await SizeGroup.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') }
  })
  if (exists) {
    res.status(409)
    throw new Error('Size group with this name already exists')
  }

  const sizeGroup = await SizeGroup.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Size group created successfully',
    data:    sizeGroup,
  })
})


// ─── Update Size Group ────────────────────────────────────────
const updateSizeGroup = asyncHandler(async (req, res) => {
  const { name } = req.body

  // ✅ check exists first
  const sizeGroup = await SizeGroup.findById(req.params.id)
  if (!sizeGroup) {
    res.status(404)
    throw new Error('Size group not found')
  }

  // ✅ then check duplicate
  const duplicate = await SizeGroup.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    _id:  { $ne: req.params.id }
  })
  if (duplicate) {
    res.status(409)
    throw new Error('Size group with this name already exists')
  }

  const updated = await SizeGroup.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  ).lean()

  res.status(200).json({
    success: true,
    message: 'Size group updated successfully',
    data:    updated,
  })
})


// ─── Delete Size Group ────────────────────────────────────────
const deleteSizeGroup = asyncHandler(async (req, res) => {

  // ✅ check exists first
  const sizeGroup = await SizeGroup.findById(req.params.id)
  if (!sizeGroup) {
    res.status(404)
    throw new Error('Size group not found')
  }

  // ✅ check in use — was commented out
  const inUse = await Product.findOne({ sizeGroup: req.params.id })
  if (inUse) {
    res.status(400)
    throw new Error('Size group is in use and cannot be deleted')
  }

  await SizeGroup.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Size group deleted successfully',
  })
})


module.exports = { getSizeGroups, createSizeGroup, updateSizeGroup, deleteSizeGroup }