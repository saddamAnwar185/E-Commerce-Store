const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema({
  cart: {
    type: Types.ObjectId,
    ref: 'cart',
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'Users',
    required: true
  },
  product: {
    type: Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shippingInfo: {
    location: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  paymentInfo: {
    cardNumber: {
      type: String,
      required: true
    },
    expiryDate: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    },
  },
  status: {
      type: String,
      default: 'processing',
      enum: ["processing", "on the way", "fulfilled"]
    },
    isCancleFromUser: {
      type: Boolean,
      default: false
    }
}, {
  timestamps: true
});

const Order = model("order", orderSchema);
module.exports = Order;
