const api = require('express').Router()
const path = require('path')
const { readFile } = require('fs')

api.get('/', (req, res) => {
	readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
		if (err) console.error(err)
		res.status(200).json(JSON.parse(data))
	})
})

api.post('/', (req, res) => {
	console.log(req.method)
	console.log(req.body)
})

module.exports = api
