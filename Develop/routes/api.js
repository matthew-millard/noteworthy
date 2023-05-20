const api = require('express').Router()
const path = require('path')
const { readFile, writeFile } = require('fs')
const { v4: uuidv4 } = require('uuid')

api.get('/', (req, res) => {
	readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
		if (err) console.error(err)
		res.status(200).json(JSON.parse(data))
	})
})

api.post('/', (req, res) => {
	const { title, text } = req.body

	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		}
		readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
			if (err) {
				console.error(err)
			} else {
				const parsedNotes = JSON.parse(data)
				parsedNotes.push(newNote)

				writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedNotes, null, 2), err => (err ? console.error(err) : console.info('Your note has been added to the database.')))
			}
		})
		const response = {
			status: 'Success',
			body: newNote,
		}
		res.status(201).json(response)
	} else {
		res.status(500).json('Error, unable to save note.')
	}
})

api.delete('/:id', (req, res) => {
	const id = req.params.id // String

	if (id) {
		readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
			if (err) console.error(err)
			const parsedData = JSON.parse(data)
			const updatedData = parsedData.filter(item => item.id !== id)
			writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedData, null, 2), err => (err ? console.error(err) : console.info('Your note has been removed from the database.')))
		})
		const response = {
			status: 'Success',
		}
		res.status(201).json(response)
	} else {
		res.status(500).json('Error, unable to delete note.')
	}
})

module.exports = api
