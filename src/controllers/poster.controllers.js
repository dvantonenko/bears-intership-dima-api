const s3 = require('../../s3bucket')
const PosterService = require('../services/posters.services')
const { putToBucket, getFromBucket } = s3()

exports.addPosterController = async (req, res) => {
    try {

        const { task, file } = req.body
        await putToBucket(Buffer.from(file, 'utf-8'), task.key)
        await PosterService.addPoster('PosterLists', task)
        res.status(200).json({ message: "Post added successfully" })
    } catch (e) {
        res.status(500).json({ errorMessage: "Failed to create post"})
    }
}

exports.getPostersController = async (req, res) => {
    try {
        const { currentPage, postersPerPage, lastElemKey , filter} = req.query
        const posters = await PosterService.fetchAllPosters("PosterLists", currentPage, postersPerPage, lastElemKey, filter)
        res.status(200).json({ posters })
    } catch (e) {
        res.status(500).json({ message: "Server error, try again" })
    }

}

exports.deletePosterController = async (req, res) => {
    try {
        const { id } = req.body
        await PosterService.deletePoster('PosterLists', req.body)

        if (!id) {
            res.status(400).json({ message: 'Invalid identifier' })
        }
        res.status(200).json({ message: "Post successfully deleted" })
    } catch (e) {
        res.status(500).json({ errorMessage: 'Something went wrong, please try again'})
    }

}


exports.getByIdController = async (req, res) => {
    try {
        const poster = await PosterService.fetchByKey(req.params.id)

        poster.Item.src = await getFromBucket(poster.Item.key)
        if (!req.params.id) {
            res.status(400).json({ message: "Invalid identifier" })
        }
        res.status(200).json(poster)
    } catch (e) {
        res.status(500).json({ errorMessage: 'Something went wrong, please try again' })
    }
}

exports.updatePosterConroller = async (req, res) => {
    try {
        await PosterService.updatePoster(req.body)
        res.status(200).json({ message: "Post updated" })
    } catch (e) {
        res.status(500).json({ errorMessage: 'Data refresh error, please try again'})
    }

}

