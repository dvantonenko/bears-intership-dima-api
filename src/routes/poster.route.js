const { Router } = require('express')
const router = Router()
const isEmpty = require("../middleware/isempty.middleware.js")
const isAuth = require("../middleware/auth.middleware")
const controller = require('../controllers/poster.controllers')

router.get('/',controller.getPostersController)

router.post('/add',isEmpty ,isAuth , controller.addPosterController)

router.post('/delete',isAuth, controller.deletePosterController)

router.get('/update/:id', controller.getByIdController)

router.post('/update',isEmpty,isAuth,controller.updatePosterConroller)

module.exports = router