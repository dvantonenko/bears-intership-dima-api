const { Router } = require('express')
const Todo = require('../models/todo.model')
const router = Router()

router.get('/', async (req, res) => {

    try {
        const todos = await Todo.getAllTodos()
        res.status(200).json({ todos })
    } catch (e) {
        console.log(e.message)
    }
})


router.post('/add', async (req, res) => {
    try {

        const { title, subtitle, discription, url, id } = req.body
        const todo = new Todo(title, subtitle, discription, url, id)
        await todo.save()
    } catch (e) {

        console.log(e.message)

    }
})

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        console.log(id)
        await Todo.deletePost(id);
    } catch (e) {
        console.log(e.message)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.getById(req.params.id)
        res.status(200).json({ todo })
    } catch (e) {
        console.log(e.message)
    }
})

router.post('/update', async (req, res) => {
    try {
        const { title, discription, subtitle, url, id } = req.body
        const todo = new Todo(title, subtitle, discription, url, id)
        await todo.update(todo)
        res.status(200).json({ message: "Успешное обновление" })
    } catch (e) {
        console.log(e.message)
    }

})
module.exports = router