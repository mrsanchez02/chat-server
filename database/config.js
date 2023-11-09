const mongoose = require('mongoose')

const dbConnection = async () => {
  const URI = process.env.DB_CN_STRING
  try {
    await mongoose.connect(URI)
    console.log('[💾]: DB Online!')
  } catch (error) {
    console.log(error)
    throw new Error('Database error')
  }
}

module.exports = {
  dbConnection
}
