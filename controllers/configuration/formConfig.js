const asyncHandler = require('express-async-handler');

const Category = require('../../models/configuration/category');
const SizeGroup = require('../../models/configuration/sizeGroup')


const getFormConfig = asyncHandler( async (req, res) => {

    const [categories, sizeGroups] = await Promise.all([
        Category.find({isActive: true}).select('name').lean(),
        SizeGroup.find({isActive: true}).select('name').lean(),
    ])

    res.status(200).json({
        status: true, 
        data: {categories, sizeGroups}
    })

})

module.exports = { getFormConfig };