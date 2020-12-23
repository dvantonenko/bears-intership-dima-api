const postersService = require('../services/posters.services')
const s3 = require('../../s3bucket')
const { addPoster, deletePoster, fetchAllPosters, updatePoster, fetchByKey, fetchQueryPosters } = postersService()
const { putToBucket, getFromBucket } = s3()

exports.addPosterController = async (req, res) => {
    try {
        const { task, file } = req.body
        await putToBucket(Buffer.from(file, 'utf-8'), task.key)
        await addPoster('PostersList', task)
        return res.status(200).json({ message: "Post added successfully" })
    } catch (e) {
        return res.status(500).json({ errorMessage: "Check if the input data is correct", error: e.message })
    }
}

exports.getPostersController = async (req, res) => {
    try {
        const { currentPage, postersPerPage , listId} = req.query

            const posters = await fetchAllPosters("PostersList", currentPage, postersPerPage , listId)
        
      

        // if (posters.queryResult)
        //     for (let i = 0; i < posters.queryResult.length; i++) {
        //         posters.queryResult[i].src = await getFromBucket(posters.queryResult[i].key)
        //     }
        res.status(200).json({ posters })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Server error, try again", error: e.message })
    }

}

exports.deletePosterController = async (req, res) => {
    try {
        const { id } = req.body
        deletePoster('PostersList', req.body)
        if (!id) {
            res.status(400).json({ message: 'Invalid identifier' })
        }
        res.status(200).json({ message: "Post successfully deleted" })
    } catch (e) {
        res.status(500).json({ errorMessage: 'Something went wrong, please try again', error: e.message })
    }

}


exports.getByIdController = async (req, res) => {
    try {
        console.log(req.params)
        const poster = await fetchByKey(req.params.id)

        poster.Item.src = await getFromBucket(poster.Item.key)
        if (!req.params.id) {
            res.status(400).json({ message: "Invalid identifier" })
        }
        res.status(200).json(poster)
    } catch (e) {

        res.status(500).json({ errorMessage: 'Something went wrong, please try again', error: e.message })
    }
}

exports.updatePosterConroller = async (req, res) => {
    try {
        updatePoster(req.body)
        res.status(200).json({ message: "Post updated" })
    } catch (e) {

        res.status(500).json({ errorMessage: 'Data refresh error, please try again', error: e.message })
    }

}

