// Imports
const express = require('express')
const path = require('path')
const routes = require('./routes')

// Port
const PORT = process.env.PORT|| 3001

// Express Application
const app = express()

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(routes)

// Wildcard will return index.html
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Port 3001 Setup
app.listen(PORT, () => {
	console.log(`Application is running on port: ${PORT} 🚀`)
})
