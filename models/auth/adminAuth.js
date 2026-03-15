const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

const adminSchema = new mongoose.Schema(
  {
    // ─── Basic Info ───────────────────────────────────────────
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
    },

    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      trim:      true,
      match:     [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },

    password: {
      type:      String,
      required:  [true, 'Password is required'],
      select:    false,   // ✅ never returned in queries by default
    },

    avatar: {
      type:    String,
      default: null,
    },

    // ─── Role & Permissions ───────────────────────────────────
    role: {
      type:    String,
      enum:    ['superadmin', 'admin', 'staff'],
      default: 'admin',
    },

    isActive: {
      type:    Boolean,
      default: true,
    },

    // ─── Password Reset ───────────────────────────────────────
    resetToken:       { type: String,  default: null, select: false },
    resetTokenExpiry: { type: Date,    default: null, select: false },

    // ─── OTP ──────────────────────────────────────────────────
    otp:       { type: String,  default: null, select: false },
    otpExpiry: { type: Date,    default: null, select: false },

    // ─── Security ─────────────────────────────────────────────
    lastLogin:         { type: Date,    default: null },
    failedLoginAttempts: { type: Number, default: 0   },
    lockedUntil:       { type: Date,    default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// ─── Hash password before save ────────────────────────────────
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

// ─── Instance methods ─────────────────────────────────────────

// compare entered password with hashed
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// check if account is locked
adminSchema.methods.isLocked = function () {
  return this.lockedUntil && this.lockedUntil > Date.now()
}

// increment failed attempts — lock after 5 tries
adminSchema.methods.incrementFailedAttempts = async function () {
  this.failedLoginAttempts += 1
  if (this.failedLoginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000) // lock 30 mins
  }
  await this.save()
}

// reset failed attempts on successful login
adminSchema.methods.resetFailedAttempts = async function () {
  this.failedLoginAttempts = 0
  this.lockedUntil         = null
  this.lastLogin           = new Date()
  await this.save()
}


module.exports = mongoose.model('Admin', adminSchema)