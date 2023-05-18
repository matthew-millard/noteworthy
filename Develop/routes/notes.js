const html = require('express').Router()
const path = require('path')

html.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// Exports
module.exports = html
