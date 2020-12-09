const express = require('express')
const path = require('path')
const app = express()
const dynamo = require('./dynamo.js')
const posterRoutes = require('./src/routes/poster.route')
const userRoutes = require('./src/routes/user.route')
const songRoutes = require('./src/routes/song.route')



const cors = require('cors')
app.use(cors())
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(express.json({ extended: true,limit:'50mb' }))
app.use('/poster',posterRoutes)
app.use('/user',userRoutes)
app.use('/song',songRoutes )
require('dotenv').config()

const ddbf = require('./dynamo')
const PORT = process.env.PORT || 3000

// const {updateItem , deleteItem} = ddbf()
// updateItem('Alex Duma')
// deleteItem('Bredbery')

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
