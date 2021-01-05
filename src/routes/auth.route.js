const { Router } = require('express')
const router = Router()

const controller = require('../controllers/auth.controller')

router.post('/register' ,controller.registerController)

router.post('/login' , controller.loginHandler)


module.exports = router