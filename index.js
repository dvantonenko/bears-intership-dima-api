const express = require('express')
const path = require('path')
const exphbs=require('express-handlebars')
const app = express()
const posterRoutes = require('./src/routes/poster.route')
const userRoutes = require('./src/routes/user.route')
const songRoutes = require('./src/routes/song.route')
const dynamo = require('./dynamo.js')
const hbs = exphbs.create({
    defaultLayout : 'main',
    extname : 'hbs'
})

app.engine('hbs',hbs.engine)//регистрация движка
app.set('view engine', 'hbs')//запускаем движок для использования
app.set('views','./src/views')//конфигурируем переменную указываем папку где лежат все шаблоны

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/',posterRoutes)
app.use('/user',userRoutes)
app.use('/song',songRoutes )


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Cервер был запущен на порте ${PORT}`)
})