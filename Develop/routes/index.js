const router = require('express').Router()

const routerNotes = require('./notes')
const routerApi = require('./api')

router.use('/notes', routerNotes)
router.use('/api/notes', routerApi)

// Exports
module.exports = router
