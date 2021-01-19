const { Router } = require('express')
const router = Router()

const controller = require('../controllers/auth.controller')

router.post('/register' ,controller.registerHandler)

router.post('/login' , controller.loginHandler)

router.post('/logout', controller.logoutHandler)

router.post('/refreshtoken', controller.refreshTokenHandler)


module.exports = router