const postersService = require('../services/posters.services')
const Poster = require('../models/poster.model')

const { addPoster, deletePoster, fetchAllPosters, updatePoster, fetchByKey } = postersService()

exports.addPosterController = async (req, res, next) => {
    try {
        const data = await addPoster('PostersList', req.body)
        //         const { title, subtitle, discription, src, id } = req.body
        //         const poster = new Poster(title, subtitle, discription, src, id)
        //         await poster.save()
        return res.status(200).json({ message: "Пост успешно добавлен" })
    } catch (e) {
        return res.status(500).json({ message: "Проверьте правильность данных ввода ", error: e.message })
    }
}

exports.getPostersController = async (req, res, next) => {
    try {
        const posters = await fetchAllPosters("PostersList")
        // const posters = await Poster.getAllPosters()
        res.status(200).json({ posters })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ message: "Ошибка сервера,попробуйте снова" , error: e.message  })
    }

}

exports.deletePosterController = async (req, res, next) => {
    try {
        const { id } = req.body
        deletePoster('PostersList', id)
        // await Poster.deletePost(id);
        if (!id) {
            res.status(400).json({ message: 'Не валидный индетификатор' })
        }
        res.status(200).json({ message: "Пост успешно удален" })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так,повторите попытку снова', error: e.message  })
    }

}


exports.getByIdController = async (req, res, next) => {
    try {
        const poster = await fetchByKey(req.params.id)
        // const poster = await Poster.getById(req.params.id)
        if (!req.params.id) {
            res.status(400).json({ message: "Не валидный индетификатор" })
        }
        res.status(200).json({ poster })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так,попробуйте снова', error: e.message  })
    }
}

exports.updatePosterConroller = async (req, res, next) => {
    try {
        updatePoster(req.body)
        // const { title, discription, subtitle, src, id } = req.body
        // const poster = new Poster(title, subtitle, discription, src, id)
        // await poster.update(poster)
        res.status(200).json({ message: "Пост обновлен" })
    } catch (e) {
        res.status(500).json({ message: 'Ошибка обновлнения данных,попробуйте снова', error: e.message  })
    }

}

