const { Router } = require('express')
const router = Router()
const controller = require('../controllers/poster.controllers')

router.get('/', controller.getPostersController)

router.post('/add', controller.addPosterController)

router.post('/delete', controller.deletePosterController)

router.get('/:id',controller.getByIdController)

router.post('/update', controller.updatePosterConroller)

module.exports = router