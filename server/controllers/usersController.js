const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// REGISTER
module.exports.register = async (req, res, next) => {
  try{
    const { username, password, email } = req.body
      const usernameCheck = await User.findOne({ username })
      if(usernameCheck){
        return res.json({msg:'Username already use', status: false})
      }
      const emailCheck = await User.findOne({ email })
      if(emailCheck){
        return res.json({ msg: 'Email already use', status: false })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({username, email, password: hashedPassword})
      user.password = null
      return res.json({status: true, user})
  } catch (error) {
    next(error)
  }
}

// LOGIN
module.exports.login = async (req, res, next) => {
  try{
    const { username, password } = req.body
      const user = await User.findOne({ username })
      if(!user){
        return res.json({msg:'Incorrect username or password', status: false})
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if(!isPasswordValid) {
        return res.json({msg:'Incorrect username or password', status: false})
      }
      user.password = null
      return res.json({status: true, user})
  } catch (error) {
    next(error)
  }
}

//SET AVATAR
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const image = req.body.image
    await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: image,
    })
    const userData = await User.findById(userId)
    console.log(userData)
    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
  }catch(error){
    next(error)
  }
}

//ALL USERS
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({_id:{$ne: req.params.id}}).select([
      'email',
      'username',
      'avatarImage',
      '_id'
    ])
    return res.json(users)
  }catch (error){

  }
}