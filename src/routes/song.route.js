const { Router } = require('express')
const Song = require('../models/song.model')
const ddbf = require('../../dynamo')
const router = Router()

// '/song'
router.get('/', async (req, res) => {

    const { fetchAllItems } = ddbf()
    const fetched = await fetchAllItems()
    const songs = await fetched
    res.render('songs', {
        songs: songs
    })

})

router.post('/', async (req, res) => {
    const { putItem } = ddbf()
    await putItem(req.body.singer, req.body.title)
    res.redirect('/song')

})

module.exports = router