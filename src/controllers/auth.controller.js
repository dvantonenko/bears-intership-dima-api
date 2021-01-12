const authService = require('../services/auth.services')
const { registration, login } = authService()

// auth/register
exports.registerController = async (req, res) => {
    try {
        const data = await registration(req.body)
        return res.json(data)
    } catch (e) {
        throw new Error(e)
    }
}
// /auth/login
exports.loginHandler = async (req, res) => {
    try {
        const data = await login(req.body)
        return res.json(data)
    } catch (e) {
        throw new Error(e)
    }
}

exports.logoutHandler = async (req, res) => {

}
