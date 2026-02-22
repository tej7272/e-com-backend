const mongoose = require('mongoose');

const MasterSchema = new mongoose.Schema(
  {
    categories: {
      type: [
        {
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: [] // ✅ Ensures empty array if no data
    },

    sizes: {
      type: [
        {
          categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, trim: true,}, 
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: []
    },

    brands: {
      type: [
        {
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: [] // ✅ Ensures empty array if no data
    },

    colors: {
      type: [
        {
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: [] // ✅ Ensures empty array if no data
    },

    orderStatus: {
      type: [
        {
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: [] // ✅ Ensures empty array if no data
    },

    gender: {
      type: [
        {
          key: { type: String, required: true, unique: true, trim: true, lowerCase: true },
          label: { type: String, required: true, trim: true, }, 
        }
      ],
      default: [] // ✅ Ensures empty array if no data
    },

    version: { type: String, default: "1.0.0" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Master", MasterSchema);