const { v4: uuid } = require('uuid');
const fs = require('fs')
const path = require('path');
class Todo {
    constructor(title) {
        this.title = title
        this.id = uuid()
    }

    toJSON() {
        return {
            title: this.title,
            id: this.id
        }
    }

    async save() {
        const todos = await Todo.getAllTodos()//полуаем данные из файла
        todos.push(this.toJSON())//контекст this в данном случаи является экземпляр класса у которого вызываем метод

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..','..', 'data', 'todos.json'),
                JSON.stringify(todos),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAllTodos() {//статический метод для получения данных
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', '..', 'data', 'todos.json'),
                'utf-8', (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))//получаем данные в формате строки и распарсим результат
                    }
                }
            )
        }
        )

    }

    static async getById(id) {
        const todos = await Todo.getAllTodos()
        return todos.find(item => item.id === id)
    }

    static async update(todo) {
        const todos = await Todo.getAllTodos()
        const index = todos.findIndex(item => item.id === todo.id)
        todos[index] = todo
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..','..',  'data', 'todos.json'),
                JSON.stringify(todos),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
    static async delete(todo) {
        const todos = await Todo.getAllTodos()

        const index = todos.findIndex(item => item.id === todo.id)
        todos.splice(index,1)
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..','..', 'data', 'todos.json'),
                JSON.stringify(todos),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Todo