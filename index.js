const express = require('express')
const path = require('path')
const app = express()
const posterRoutes = require('./src/routes/poster.route')
const userRoutes = require('./src/routes/user.route')
const authRoutes = require('./src/routes/auth.route')

const cors = require('cors')



app.use(cors())
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true,limit:'500mb'}))
app.use(express.json({ extended: true,limit:'500mb' }))
app.use('/poster',posterRoutes)
app.use('/user',userRoutes)
app.use('/auth', authRoutes)

require('dotenv').config()

const PORT = process.env.PORT || 3000

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Cервер был запущен на порте ${PORT}`)
        })
    } catch (e) {
        console.log("Ошибка при запуске сервера", e.message)
        process.exit(1)
    }
}
start()
