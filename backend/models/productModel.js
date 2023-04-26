const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        name: String,
        price: [Int32Array, 'Please input a price'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description to the product']
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)