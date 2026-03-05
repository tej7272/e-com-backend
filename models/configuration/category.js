const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true,
            minlength: [4, 'Name must be at least 2 characters'],
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
        versionKey: false,   // removes __v field from documents
    }
);

module.exports = mongoose.model('Category', categorySchema);