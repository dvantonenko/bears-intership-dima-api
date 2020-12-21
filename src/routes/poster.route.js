const { Router } = require('express')
const router = Router()
const isEmpthy = require("../middleware/isempthy.middleware.js")
const controller = require('../controllers/poster.controllers')

router.get('/', controller.getPostersController)

router.post('/add',isEmpthy , controller.addPosterController)

router.post('/delete', controller.deletePosterController)

router.get('/update/:id', controller.getByIdController)

router.post('/update',isEmpthy,controller.updatePosterConroller)

module.exports = router