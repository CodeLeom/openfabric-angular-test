const express = require('express')
const router = express.Router()
const {getProducts, getProduct, createProduct, deleteProduct, updateProduct} = require('../controllers/productController')

const {protect} = require('../middleware/authMiddleware')



router.route('/').get(protect, getProducts).post(protect, createProduct)

router.route('/:id').get(protect, getProduct).delete(protect, deleteProduct).put(protect, updateProduct)


module.exports = router