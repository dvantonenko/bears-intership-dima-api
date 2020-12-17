const postersService = require('../services/posters.services')

const { addPoster, deletePoster, fetchAllPosters, updatePoster, fetchByKey, fetchQueryPosters } = postersService()

exports.addPosterController = async (req, res) => {
    try {
        const data = await addPoster('PostersList', req.body)
        return res.status(200).json({ message: "Post added successfully" })
    } catch (e) {
        return res.status(500).json({ message: "Check if the input data is correct", error: e.message })
    }
}

exports.getPostersController = async (req, res) => {
    try {
        const { currentPage, postersPerPage } = req.query
        const posters = await fetchAllPosters("PostersList", currentPage, postersPerPage)
        res.status(200).json({ posters})
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ message: "Server error, try again", error: e.message })
    }

}

exports.deletePosterController = async (req, res) => {
    try {
        const { id } = req.body
        deletePoster('PostersList', id)
        if (!id) {
            res.status(400).json({ message: 'Invalid identifier' })
        }
        res.status(200).json({ message: "Post successfully deleted" })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again', error: e.message })
    }

}


exports.getByIdController = async (req, res) => {
    try {
        const poster = await fetchByKey(req.params.id)
        if (!req.params.id) {
            res.status(400).json({ message: "Invalid identifier" })
        }
        res.status(200).json({ poster })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, please try again', error: e.message })
    }
}

exports.updatePosterConroller = async (req, res) => {
    try {
        updatePoster(req.body)
        res.status(200).json({ message: "Post updated" })
    } catch (e) {
        res.status(500).json({ message: 'Data refresh error, please try again', error: e.message })
    }

}

