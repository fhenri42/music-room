/* istanbul ignore file */
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import event from './events/index.js'
import config from '../config.js'
import okok from '../test/createfake.js'

const app = express()
const server = require('http').createServer(app)

const createRouter = require('./routes').createRouter
mongoose.Promise = Promise

mongoose.connection.openUri(`mongodb://${config.local.host}:${config.local.dbPort}/${config.local.dbName}`, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*, X-Expiry, X-Client, X-Access-Token, X-pass, X-Uuid, Content-Type, Authorization')

  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mongoose.connection
db.on('error', err => {
  console.log('FAILED TO CONNECT', err)
  process.exit(1)
})

global.io = require('socket.io')(server)
io.on('connection', (socket) => {
  event(socket)
})

db.once('open', () => {
  createRouter(app)
  // okok()
  server.listen(config.local.port, () => {
    if (process.env.NODE_ENV === 'development') { console.log(`App is running and listening to port ${config.local.port}`) }
  })
})
