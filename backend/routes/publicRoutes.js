const express = require('express')
const router = express.Router()
const {getProjects, getProject, getProfile, searchProjects} = require('../controllers/publicController')


router.get('/projects', getProjects)

router.get('/projects/:id', getProject)

router.get('/projects/all/search', searchProjects)

router.get('/user/profile/:id', getProfile)



module.exports = router