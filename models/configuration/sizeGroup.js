const mongoose = require('mongoose');

const SizeGroupSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: true, trim: true
    },
    description: {
        type: String, trim: true
    },
    isActive: {
        type: Boolean, default: true
    },
    sizes: {
        type: [String],
        default: []
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('SizeGroup', SizeGroupSchema);