const { response, request } = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')


const createUser = async (req = request, res = response) => {
  try {
    const {email, password} = req.body
    
    const emailExist = await User.findOne({email})
    if(emailExist){
      return res.status(400).json({
        ok: false,
        msg: 'The email is already registered'
      })
    }

    const user = new User(req.body);
    // Encrypt password.
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user:
    await user.save();

    // generate token
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }
}

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const userExist = await User.findOne({email})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator'
    })
  }
}

const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew'
  })
}

module.exports = {
  createUser,
  login,
  renewToken
}
