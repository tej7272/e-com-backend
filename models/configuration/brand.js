const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand name is required'],
            trim: true,
            unique: true,
            minlength: [3, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        isActive: {
            type: Boolean,
            default: true,
            required: [true, 'Active status is required'],
            index: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
    },
    { 
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Brand', brandSchema);