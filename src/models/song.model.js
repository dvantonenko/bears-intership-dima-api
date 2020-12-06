const { v4: uuid } = require('uuid');
const fs = require('fs')
const path = require('path');
const ddbf = require('../../dynamo')

class Song {
    constructor(artist, songTitle) {
        this.artist = artist,
            this.songTitle = songTitle
        this.id = uuid()
    }
    toJSON() {
        return {
            artist: this.artist,
            songTitle: this.songTitle,
            id: this.id
        }
    }
    
    async save() {
        const { putItem, fetchOneByKey, fetchAllItems } = ddbf()

    }

    static getAllSongs() {//статический метод для получения данных
    }

    static async getById(id) {

    }

    static async update(todo) {

    }
    static async delete(todo) {

    }
}

module.exports = Song