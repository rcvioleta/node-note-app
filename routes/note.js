const express = require('express')

const router = express.Router()

const noteController = require('../controller/note')

router.get('/', noteController.getIndex)

router.post('/create', noteController.createNote)

router.get('/show', noteController.getNotes)

router.post('/delete', noteController.removeNote)

module.exports = router;