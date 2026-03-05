const asyncHandler = require('express-async-handler');

const Category = require('../../models/configuration/category');


const getFormConfig = asyncHandler( async (req, res) => {

    const [categories] = await Promise.all([
        Category.find({isActive: true}).select('name').lean(),
    ])

    res.status(200).json({
        status: true, 
        data: {categories}
    })

})

module.exports = { getFormConfig };