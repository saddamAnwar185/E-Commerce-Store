const express = require('express')
const { handleSignup, handleLogin, handleVerifyLogin, handleLogout } = require('../Controllers/UserController')
const { VerifyUserAuth } = require('../Middlewares/Auth')
const router = express.Router()

router.post('/signup', handleSignup)
router.post('/login', handleLogin)
router.get('/verifyLogin', VerifyUserAuth, handleVerifyLogin)
router.get('/logout', VerifyUserAuth, handleLogout)



module.exports = router