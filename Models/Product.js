const {Schema, model} = require('mongoose')


const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        secure_url: {
        type: String,
        required: true
        },
        public_id: {
            type: String,
        required: true
        }
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Products = model("Products", productSchema)

module.exports = Products