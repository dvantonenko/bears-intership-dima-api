const { Router } = require('express')
const Poster = require('../models/poster.model')
const fs = require('fs')
const path = require('path');
const router = Router()


router.get('/', async (req, res) => {
    try {
        const posters = await Poster.getAllPosters()
        res.status(200).json({ posters })
    } catch (e) {
    res.status(500).json({message : "Ошибка сервера,попробуйте снова"})
    }
})


router.post('/add', async (req, res) => {
    try {
        const { title, subtitle, discription, url, id } = req.body
        const poster = new Poster(title, subtitle, discription, url, id)
        await poster.save()
        res.status(200).json({ message : "Пост успешно добавлен"})

    } catch (e) {
        res.status(400).json({ message: "Проверьте правильность данных ввода ", error: e.message })
    }
})

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body
        await Poster.deletePost(id);
        if(!id){
            res.status(400).json({message : 'Не валидный индетификатор'})
        }
        res.status(200).json({message : "Пост успешно удален"})
    } catch (e) {
     res.status(400).json({message : 'Что-то пошло не так,повторите попытку снова'})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const poster = await Poster.getById(req.params.id)
        if(!req.params.id){
            res.status(400).json({message : "Не валидный индетификатор"})
        }
        res.status(200).json({ poster })
    } catch (e) {
       res.status(500).json({message : 'Что-то пошло не так,попробуйте снова'})
    }
})

router.post('/update', async (req, res) => {
    try {
        
        const { title, discription, subtitle, url, id } = req.body
        const poster = new Poster(title, subtitle, discription, url, id)
        await poster.update(poster)
        res.status(200).json({ message: "Пост обновлен" })
    } catch (e) {
        res.status(400).json({message : 'Ошибка обновлнения данных,попробуйте снова'})
    }

})
module.exports = router