const { Router } = require('express')
const router = Router()

const controller = require('../controllers/auth.controller')

router.post('/register' ,controller.registerController)

router.post('/login' , controller.loginHandler)

router.post('/logout', controller.logoutHandler)


module.exports = router