const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const socket = require('socket.io')

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

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
})

global.onlineUsers = new Map()

io.on('connection', (socket) =>{
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id)
    console.log(onlineUsers)
  })

  socket.on('send-msg', (data) => {
    console.log(onlineUsers)
    const sendUserSocket = onlineUsers.get(data.to)
    console.log(sendUserSocket)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit('msg-receive', data.message) 
    } 
  })

  socket.on('logout', (userId) => {
    console.log('logout')
    onlineUsers.delete(userId)
  })
})



