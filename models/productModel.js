const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    }, 
    sku: {
        type: String,
        required: true,
        trim: true,
    }, 
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    quantity: {
        type: String,
        trim: true,
    },  
    description: {
        type: String,
    },
    itemPics: [String], 
    colors: [{type: String, required: true}], 
    sizes: [String], 
},
{timestamps: true}
)

module.exports = mongoose.model('Product', ProductSchema)