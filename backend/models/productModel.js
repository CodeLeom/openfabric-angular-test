const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a product name']
      },
      price: {
        type: Number,
        required: [true, 'Please add a product price']
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