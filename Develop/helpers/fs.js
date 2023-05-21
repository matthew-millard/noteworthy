const { readFile, writeFile } = require('fs/promises')

// readFile
async function readFileData(filePath) {
	try {
		const contents = await readFile(filePath, { encoding: 'utf-8' })
		return contents
	} catch (err) {
		console.error(err.message)
	}
}

// writeFile
async function writeDataToFile(filePath, data) {
	try {
		const dataString = JSON.stringify(data, null, 2)
		writeFile(filePath, dataString)
	} catch (err) {
		console.error(err.message)
	}
}

module.exports = { readFileData, writeDataToFile }
