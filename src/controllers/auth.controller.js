const authService = require('../services/auth.services')
const { registration, login } = authService()

// auth/register
exports.registerController = async (req, res) => {
    try {
        const data = await registration(req.body)
        return res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Registration error", error: e })
    }
}
// /auth/login
exports.loginHandler = async (req, res) => {
    try {
        const data = await login(req.body)
        return res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Login error", error: e })

    }
}

exports.logoutHandler = async (req, res) => {

}
