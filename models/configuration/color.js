const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Color name is required'],
            trim: true,
            unique: true,
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        hex: {
            type: String,
            required: [true, 'Hex is required'],
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

module.exports = mongoose.model('Color', colorSchema);