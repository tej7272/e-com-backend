const asyncHandler = require('express-async-handler');

const Category = require('../../models/configuration/category');
const SizeGroup = require('../../models/configuration/sizeGroup');
const Brand = require("../../models/configuration/brand");
const SubCategory = require("../../models/configuration/subCategory");
const {
    GENDER,
    ORDER_STATUS,
    PAYMENT_STATUS,
    PAYMENT_METHOD,
    TICKET_STATUS,
    TICKET_PRIORITY,
    INVOICE_STATUS,
    PRODUCT_STATUS,
} = require('../../constant/appConstants');


const getFormConfig = asyncHandler( async (req, res) => {

    const [categories, sizeGroups, brands, subCategories] = await Promise.all([
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
    ])

    res.status(200).json({
        status: true, 
        data: {
            categories, 
            sizeGroups, 
            brands, 
            subCategories,

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