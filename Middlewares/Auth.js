const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET


const setUser = (user) => {
    const payload = {
        'name': user.name,
        'email': user.email,
        '_id': user._id
    }

    const token = jwt.sign(payload, SECRET)

    return token
}

const VerifyUserAuth = (req, res, next) => {
    const token = req.cookies?.uid

    try {
        if(!token) {
            return res.json({ success: false, message: 'Login First' })
        }

        const results = jwt.verify(token, SECRET)

        if(results) {
            next()
        } else {
            res.json({ success: false, message: 'You are not authenticated' })
        }

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error" })
    }
}


module.exports = {
    setUser,
    VerifyUserAuth
}