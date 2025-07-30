const express = require('express')
const { VerifyUserAuth } = require('../Middlewares/Auth')
const { handleHeaderImageUpload, getMensHeaderImages, getWomensHeaderImages, getKidsHeaderImages, getAccessoriesHeaderImages, deleteHeaderImage, getAllHeaderImages, getHomeHeaderImages } = require('../Controllers/HeaderController')
const router = express.Router()

router.post('/postHeaderImage', VerifyUserAuth, handleHeaderImageUpload)
router.get('/getMensImages', getMensHeaderImages)
router.get('/getWomensImages', getWomensHeaderImages)
router.get('/getKidsImages', getKidsHeaderImages)
router.get('/getAccessoriesImages', getAccessoriesHeaderImages)
router.delete('/deleteHeaderImage/:id', VerifyUserAuth, deleteHeaderImage)
router.get('/getAllHeaderImages', getAllHeaderImages)
router.get('/getHomeHeaderImages', getHomeHeaderImages)

module.exports = router