const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Auth')
const { handleAddToCart, handleShowCartItems, handleDeleteCartItem, handleIncreaseQuantity, handleDecreaseQuantity } = require('../Controllers/CartController')
const router = express.Router()

router.post('/addToCart', VerifyUserAuth, handleAddToCart)
router.get('/getCartProducts/:id', VerifyUserAuth, handleShowCartItems)
router.delete('/deleteCartItem/:id', VerifyUserAuth, handleDeleteCartItem)
router.get('/increaseQuantity/:id', VerifyUserAuth, handleIncreaseQuantity)
router.get('/decreaseQuantity/:id', VerifyUserAuth, handleDecreaseQuantity)

module.exports = router