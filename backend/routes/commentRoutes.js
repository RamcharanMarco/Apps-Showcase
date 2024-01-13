const express = require('express')
const router = express.Router()
const {getCommentsByProjectId, CreateComment} = require('../controllers/commentController')

router.post('/:id', CreateComment)

router.get('/projects/:id', getCommentsByProjectId)

module.exports = router