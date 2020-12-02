const { Router } = require('express')
const Todo = require('../models/todo')
const router = Router()

// '/'
router.get('/', async (req, res) => {
    const todos = await Todo.getAllTodos()
    res.render('home', {
        title: 'Домашняя страница',
        todos: todos
    })
})
router.post('/', async (req, res) => {
    console.log(req.body)
    const todo = new Todo(req.body.title);//создаем модель и добавляем title в конструктор
    await todo.save()//полученный данные сохраняем в файле
    res.redirect('/')

})

router.get('/:id', async (req, res) => {
    const todo = await Todo.getById(req.params.id)
    res.render('todo',
        {
            title: todo.title,
            todo
        })

})

router.post('/:id', async (req, res) => {
    console.log(req.body)
    await Todo.update(req.body)
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    console.log(req.body)
    await Todo.delete(req.body)
    res.redirect('/')
})

module.exports = router