const {Schema, model, Types} = require('mongoose')

const cartSchema = new Schema({
    createBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    Product: {
        type: Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const Cart = model("cart", cartSchema)

module.exports = Cart