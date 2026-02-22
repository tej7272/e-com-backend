const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');


const getAllProducts = asyncHandler(async(req, res)=> {
    const product = await Product.find();
    console.log("product", product);
    res.status(200).json("product found")
})

const addProduct = asyncHandler( async(req, res, next) => {
    const payload = req.body;

    const product = await Product.findOne(
        { 
            $or: [
                {_id: payload._id},
                {sku: payload.sku}
            ]
        }
    );
    if(product){
        res.status(409);
        throw new Error(`Product already exists`)
    }
    
    // const insertProduct = await Product.insertOne(payload);
    const createProduct = await Product.create(payload);
    // console.log("insertProduct", insertProduct);
    console.log("creProduct", createProduct);
    res.status(200).json({status: true, message: "Product successfully added"});

})


module.exports = {
    getAllProducts,
    addProduct
}