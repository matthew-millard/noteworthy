// Imports
const express = require('express')
const PORT = process.env.port || 3001

// Express Application
const app = express()


// Port 3001 Setup
app.listen(PORT, () => {
    console.log(`Application is running on port: ${PORT} 🚀`) 
})
