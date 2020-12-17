const { v4: uuid } = require('uuid');
const fs = require('fs')
const path = require('path');
class Poster {
    constructor(title, subtitle, description, src, id) {
        this.title = title,
            this.subtitle = subtitle,
            this.description = description,
            this.src = src,
            this.id = id
    }

    toJSON() {
        return {
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            src: this.src,
            id: this.id
        }
    }

  async save() {
        const posters = await Poster.getAllPosters()//получаем данные из файла
        posters.push(this.toJSON())//контекст this в данном случаи является экземпляр класса у которого вызываем метод
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', '..', 'data', 'todos.json'), JSON.stringify(posters),
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

    static async getAllPosters() {//статический метод для получения данных
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
    static async deletePost(id) {
        
        const posters = await Poster.getAllPosters()//полуаем данные из файла
        const index = posters.findIndex(item => item.id === id)
        posters.splice(index, 1)

        fs.truncate(path.join(__dirname, '..', '..', 'data', 'todos.json'), 0, function () { console.log('file cleared') })

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', '..', 'data', 'todos.json'), JSON.stringify(posters),
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

    static async getById(id) {
        const posters = await Poster.getAllPosters()
        const elem = posters.find(item => item.id === id)
        return elem
    }

    async update(poster) {
        const posters = await Poster.getAllPosters()
        const index = posters.findIndex(item => item.id === poster.id)
        posters[index] = poster

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', '..', 'data', 'todos.json'),
                JSON.stringify(posters),
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

module.exports = Poster