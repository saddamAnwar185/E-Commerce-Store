const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ConnectDB = require('./lib/Connection')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const PORT = process.env.PORT || 5000
ConnectDB()

// Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}))
app.use(cors({
  origin: 'http://localhost:8000', // Your frontend URL
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE"]
}));

// API Routes
app.use('/api', require('./Routes/User'))
app.use('/api', require('./Routes/Products'))
app.use('/api', require('./Routes/Cart'))
app.use('/api', require('./Routes/Order'))
app.use('/api', require('./Routes/Header'))

// Serve static frontend files from dist folder
const __dirnamePath = path.resolve()  // To use __dirname in ES module
app.use(express.static(path.join(__dirnamePath, 'dist')))

// Fallback for SPA (for React/Vite apps)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirnamePath, 'dist', 'index.html'))
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
