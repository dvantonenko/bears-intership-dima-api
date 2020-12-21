module.exports = (req, res, next) => {
    try {
        if (req.body.task) {
            const { task } = req.body
            if (req.body)
                if (!task.title || !task.subtitle || !task.description)
                    return res.status(200).json({ errorMessage: "Must not be empthy fields" })
        } else {
            const { title, subtitle, description } = req.body
            if (!title || !subtitle || !description) {
                return res.status(200).json({ errorMessage: "Must not be empthy fields" })
            }
        }
        next()
    } catch (e) {
        return res.status(500).json(e)
    }
}