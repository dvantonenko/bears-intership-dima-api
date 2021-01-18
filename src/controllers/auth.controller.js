const authService = require('../services/auth.services')
const { registration, login, refreshSession, logout } = authService()

// auth/register
exports.registerHandler = async (req, res) => {
    try {
        const data = await registration(req.body)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Registration error", error: e })
    }
}
// /auth/login
exports.loginHandler = async (req, res) => {
    try {
        const data = await login(req.body)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Login error", error: e })
    }
}

exports.logoutHandler = async (req, res) => {
    try {
        const signOutMessage = await logout(req.body.email)
        res.status(200).send(signOutMessage)
    } catch (e) {
        res.status(500).json({ errorMessage: "Logout error", error: e })
    }
}

exports.refreshTokenHandler = async (req, res) => {
    try {
        const { refreshToken, email } = req.body
        const data = await refreshSession(refreshToken, email)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Refresh token error", error: e })

    }


}
