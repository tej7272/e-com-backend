const asyncHandler = require('express-async-handler');

const Category = require('../../../models/configuration/category');
const SizeGroup = require('../../../models/configuration/sizeGroup');
const Brand = require("../../../models/configuration/brand");
const SubCategory = require("../../../models/configuration/subCategory");
const Color = require("../../../models/configuration/color");
const {
    GENDER,
    ORDER_STATUS,
    PAYMENT_STATUS,
    PAYMENT_METHOD,
    TICKET_STATUS,
    TICKET_PRIORITY,
    INVOICE_STATUS,
    PRODUCT_STATUS,
} = require('../../../constant/appConstants');


const getFormConfig = asyncHandler( async (req, res) => {

    const [categories, sizeGroups, brands, subCategories, colors] = await Promise.all([
        Category.find({isActive: true}).select('name').lean(),
        SizeGroup.find({isActive: true}).select('name').lean(),
        Brand.find({isActive: true}).select('name').lean(),
        SubCategory.find({isActive: true})
            .select('name category sizeGroup')
            .populate('category', 'name')
            .populate('sizeGroup', 'name sizes')
            .lean()
            .then(docs => docs.map(doc => ({
                ...doc,
                category:  doc.category  || null,
                sizeGroup: doc.sizeGroup || null,
            }))),
        Color.find({isActive: true}).select('name hex').lean()
    ])

    res.status(200).json({
        success: true, 
        data: {
            categories, 
            sizeGroups, 
            brands, 
            subCategories,
            colors,

            gender: GENDER,
            orderStatus: ORDER_STATUS,
            paymentStatus: PAYMENT_STATUS,
            paymentMethod: PAYMENT_METHOD,
            ticketStatus: TICKET_STATUS,
            ticketPriority:TICKET_PRIORITY,
            invoiceStatus: INVOICE_STATUS,
            productStatus: PRODUCT_STATUS,
        }
    })

})

module.exports = { getFormConfig };