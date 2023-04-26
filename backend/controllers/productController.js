const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Product = require('../models/productModel')

// @desc        Get user tickets from db
// @route      GET /api/products
// @access      Private
const getProducts = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const products = await Product.find({user: req.user.id})

    res.status(200).json(products)
})

// @desc        Get user product (single)
// @route      GET /api/products/:id
// @access      Private
const getProduct = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    if (product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }
    res.status(200).json(product)
})

// @desc        Create new products
// @route      POST /api/tickets
// @access      Private
const createProduct = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Please enter product name and the details')
    }
     // Get user using the id in the JWT
     const user = await User.findById(req.user.id)

     if(!user) {
         res.status(401)
         throw new Error('User not found')
     }

     const sProduct = await Product.create({
        product,
        description,
        user: req.user.id
     })
    res.status(201).json(sProduct)
})

// @desc        Delete product (single)
// @route      DELETE /api/products/:id
// @access      Private
const deleteProduct = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    if (product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }

    await product.deleteOne({id: req.params.id})

    res.status(200).json({success: true})
})

// @desc        Update product (single)
// @route      PUT /api/products/:id
// @access      Private
const updateProduct = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }

    if (product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updateProduct)
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
}