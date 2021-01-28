const AuthService = require('../services/auth.services')

// auth/register
exports.registerHandler = async (req, res) => {
    try {
        const data = await AuthService.registration(req.body)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Registration error", error: e })
    }
}
// /auth/login
exports.loginHandler = async (req, res) => {
    try {
        const data = await AuthService.login(req.body)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Login error", error: e })
    }
}

exports.logoutHandler = async (req, res) => {
    try {
        const signOutMessage = await AuthService.logout(req.body.email)
        res.status(200).send(signOutMessage)
    } catch (e) {
        res.status(500).json({ errorMessage: "Logout error", error: e })
    }
}

exports.refreshTokenHandler = async (req, res) => {
    try {
        const { refreshToken, email } = req.body
        const data = await AuthService.refreshSession(refreshToken, email)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({ errorMessage: "Refresh token error", error: e })

    }


}
