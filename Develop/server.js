// Imports
const express = require('express')
const routes = require('./routes')

// Port
const PORT = process.env.port || 3001

// Express Application
const app = express()

// Middleware
app.use(express.static('public'))

// Routes
app.use(routes)

// Port 3001 Setup
app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT} 🚀`) 
})
