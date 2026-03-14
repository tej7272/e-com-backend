// scripts/seedAdmin.js
const mongoose = require('mongoose')
const Admin    = require('../models/auth/adminAuth')
require('dotenv').config()

const createAdmin = async () => {
  try {
    // 1. connect to DB
    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ Connected to DB')

    // 2. check if superadmin already exists
    const existing = await Admin.findOne({ role: 'superadmin' })
    if (existing) {
      console.log('⚠️  Superadmin already exists — skipping')
      process.exit(0)
    }

    // 3. create superadmin
    const admin = await Admin.create({
      name:     'Bindu tej',
      email:    process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role:     'superadmin',
      isActive: true,
    })

    console.log('✅ Superadmin created:', admin.email)
    process.exit(0)

  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

createAdmin()