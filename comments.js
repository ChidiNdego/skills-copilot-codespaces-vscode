// Create web server application
// File: server.js
// Description: create a web server application
// Date: 8/20/2021
// Programmer: Philip Basaric

// import express module
const express = require('express')
// create an instance of express
const app = express()
// import body-parser
const bodyParser = require('body-parser')
// import mongoose
const mongoose = require('mongoose')
// import path
const path = require('path')
// import dotenv
const dotenv = require('dotenv')
// import routes
const routes = require('./routes/routes')
// import cors
const cors = require('cors')

// configure dotenv
dotenv.config()

// configure body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// configure cors
app.use(cors())

// configure routes
app.use('/', routes)

// configure mongoose
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('Connected to DB')
})

// configure static path
app.use(express.static(path.join(__dirname, '../frontend/build')))

// configure port
const port = process.env.PORT || 5000

// start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})