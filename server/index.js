const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express()


// Middlewares
app.use(cors())
app.use(express.json())

// Middleware routes
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

mongoose.connect(process.env.MONGO_LOCAL_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('DB Connection successfull')
})
.catch((err) => {
  console.log(err.message)
})

const server = app.listen(process.env.PORT, () =>{
  console.log('Server listen on http://localhost:5000')
})



