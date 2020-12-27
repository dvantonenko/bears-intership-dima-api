const { Router } = require('express')
const router = Router()
const isEmpty = require("../middleware/isempty.middleware.js")
const controller = require('../controllers/poster.controllers')

router.get('/', controller.getPostersController)

router.post('/add',isEmpty , controller.addPosterController)

router.post('/delete', controller.deletePosterController)

router.get('/update/:id', controller.getByIdController)

router.post('/update',isEmpty,controller.updatePosterConroller)

module.exports = router