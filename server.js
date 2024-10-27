require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

//middleware

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

//routes

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/manage/staffs', require('./routes/staffManageRoutes'))
app.use('/departments', require('./routes/departmentRoutes'))
app.use('/', require('./routes/ServiceRoutes'))
app.use('/service', require('./routes/ServiceItemRoutes'))
app.use('/bill', require('./routes/billRoutes'))
app.use('/booking', require('./routes/bookingRoutes'))
app.use('/category', require('./routes/roomCategoryRoutes'))
app.use('/room', require('./routes/roomRoutes'))

//mongodb

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})