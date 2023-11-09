// Servidor de Express
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const cors = require('cors')

const Sockets = require('./sockets')
const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // Database connection.
    dbConnection()

    // Http server
    this.server = http.createServer(this.app)

    // Sockets settings
    this.io = socketio(this.server, { /* configuraciones */ })
  }

  middlewares () {
    // Deploy public directory
    this.app.use(express.static(path.resolve(__dirname, '../public')))

    this.app.use(express.json())

    // TODO: CORS
    this.app.use(cors())

    // API Enpoints
    this.app.use('/api/login', require('../routes/auth'))
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets () {
    new Sockets(this.io)
  }

  execute () {
    // Inicializar Middlewares
    this.middlewares()

    // Inicializar sockets
    this.configurarSockets()

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('[🚀]: Server running on port:', this.port)
    })
  }
}

module.exports = Server
