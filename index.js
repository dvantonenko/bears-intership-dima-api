const express = require('express')
const path = require('path')
const exphbs=require('express-handlebars')
const app = express()
const posterRoutes = require('./routes/poster')
const userRoutes = require('./routes/user')
const hbs = exphbs.create({
    defaultLayout : 'main',
    extname : 'hbs'
})

app.engine('hbs',hbs.engine)//регистрация движка
app.set('view engine', 'hbs')//запускаем движок для использования
app.set('views','views')//конфигурируем переменную указываем папку где лежат все шаблоны

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/',posterRoutes)
app.use('/user',userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Cервер был запущен на порте ${PORT}`)
})