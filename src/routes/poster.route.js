const { Router } = require('express')
const Poster = require('../models/poster.model')
const fs = require('fs')
const path = require('path');
const router = Router()


router.get('/', async (req, res) => {
    try {
        const posters = await Poster.getAllPosters()
        console.log(posters)
        res.status(200).json({ posters })
    } catch (e) {
        console.log(e.message)
    }
})


router.post('/add', async (req, res) => {
    try {
        const { title, subtitle, discription, url, id } = req.body
        const poster = new Poster(title, subtitle, discription, url, id)
        await poster.save()
        res.status(200).json({ message : "Пост успешно добавлен"})
    } catch (e) {

        console.log(e.message)

    }
})

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        await Poster.deletePost(id);
        res.status(200).json({message : "Пост успешно удален"})
    } catch (e) {
        console.log(e.message)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const poster = await Poster.getById(req.params.id)
        res.status(200).json({ poster })
    } catch (e) {
        console.log(e.message)
    }
})

router.post('/update', async (req, res) => {
    try {
        
        const { title, discription, subtitle, url, id } = req.body
        const poster = new Poster(title, subtitle, discription, url, id)
        await poster.update(poster)
        res.status(200).json({ message: "Пост обновлен" })
    } catch (e) {
        console.log(e.message)
    }

})
module.exports = router