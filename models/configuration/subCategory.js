const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name:        { type: String, required: true, trim: true },
        category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category',  required: true },
        sizeGroup:   { type: mongoose.Schema.Types.ObjectId, ref: 'SizeGroup',  default: null  },
        description: { type: String, trim: true },
        isActive:    { type: Boolean, default: true },
    }, 
    { 
        timestamps: true 
    }
);


module.exports = mongoose.model('SubCategory', subCategorySchema)