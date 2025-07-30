const { setUser } = require('../Middlewares/Auth')
const Users = require('../Models/Users')
const bcrypt = require('bcrypt')


const handleSignup = async (req, res) => {
    const { name, email, password } = req.body

    try {

        if(!name || !email || !password) {
            res.status(404).json({ success: false, message: 'All fields are required' })
        }
        
        const existingUser = await Users.findOne({ email })

        if(existingUser) {
            return res.status(404).json({ success: false, message: 'You have already an Account' })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new Users({
            name,
            email,
            password: hashPassword
        })

        await newUser.save()

        const token = setUser(newUser)

        res.cookie("uid", token)


        if(newUser) {
            return res.status(200).json({ success: true, message: "Register Successfully", user: newUser })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}

const handleLogin = async (req, res) => {
    const {email, password} = req.body

    try {
        
        const loginUser = await Users.findOne({ email })

        if(!loginUser) {
            return res.status(404).json({ success: false, message: 'You Dont have Account' })
        }

        const planPassword = await bcrypt.compare(password, loginUser.password)

        if(!planPassword) {
            return res.json({ success: false, message: "Wrong Password" })
        }

        const token = setUser(loginUser)
        res.cookie('uid', token)

        return res.status(200).json({ success: true, message: 'Login Success', user: loginUser })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal Server Error" })
    }
}

const handleVerifyLogin = async(req, res) => {
    try {
        res.json({ success: true, message: 'User is Login' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server Error' })
    }
}

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("uid");
    return res.json({ success: true, message: 'Logout successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



module.exports = {
    handleSignup,
    handleLogin,
    handleVerifyLogin,
    handleLogout
}