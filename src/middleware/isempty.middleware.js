module.exports = (req, res, next) => {
    try {
        if (req.body.task) {
            const { task } = req.body
                if (!task.title.trim() || !task.subtitle.trim() || !task.description.trim())
                   res.status(200).json({ errorMessage: "Must not be empty fields" })
        } else {
            const { title, subtitle, description } = req.body
            if (!title.trim() || !subtitle.trim() || !description.trim()) {
               res.status(200).json({ errorMessage: "Must not be empty fields" })
            }
        }
        next()
    } catch (e) {
       res.status(500).json(e)
    }
}