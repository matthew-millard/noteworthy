// Imports
const api = require('express').Router()
const path = require('path')
const { readFileData, writeDataToFile } = require('../helpers/fs')
const { v4: uuidv4 } = require('uuid')

// File path to db
const filePath = path.join(__dirname, '../db/db.json')

// Returns existing notes from db
api.get('/', (req, res) => {
	readFileData(filePath).then(contents => {
		res.status(200).json(JSON.parse(contents))
	})
})

// Accepts a new note and stores it to the db
api.post('/', (req, res) => {
	const { title, text } = req.body

	if (title && text) {
		const newNote = {
			title,
			text,
			id: uuidv4(),
		}
		readFileData(filePath).then(contents => {
			const parsedNotes = JSON.parse(contents)
			parsedNotes.push(newNote)
			writeDataToFile(filePath, parsedNotes)
			const response = {
				status: 'Success',
				body: newNote,
			}
			res.status(201).json(response)
			console.info('Your note has been saved. 💾')
		})
	} else {
		res.status(500).json('Invalid entry. Please make sure to include both a note title and text body. 🚫')
	}
})

// Removes note from db and returns the amended notes list
api.delete('/:id', (req, res) => {
	const id = req.params.id 

	if (id) {
		readFileData(filePath).then(contents => {
			const parsedData = JSON.parse(contents)
			const updatedData = parsedData.filter(item => item.id !== id)
			writeDataToFile(filePath, updatedData)
			console.info('Your note has been deleted. 🗑️')
		})
		const response = {
			status: 'Success',
			body: updatedData,
		}
		res.status(201).json(response)
	} else {
		res.status(500).json('Error, unable to delete note.')
	}
})


// Exports
module.exports = api
