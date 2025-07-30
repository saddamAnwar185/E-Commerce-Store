const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Auth')
const { handleProductUpload, handleDeleteProduct, handleShowAllPrducts, handleUpdateProduct } = require('../Controllers/ProductsController')
const router = express.Router()

router.get('/showProducts', handleShowAllPrducts)
router.post('/uploadProduct', VerifyUserAuth, handleProductUpload)
router.post('/updateProduct/:id', VerifyUserAuth, handleUpdateProduct)
router.delete('/deleteProduct/:id', VerifyUserAuth, handleDeleteProduct)

module.exports = router