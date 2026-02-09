
const admin = require('../configs/firebase')
const axios = require('axios')

exports.signUp = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ msg: "Error in name" })
    }
    if (!email || typeof email !== 'string' || !email.includes("@")) {
        return res.status(400).json({ msg: "Error in email" })
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ msg: "Error in password" })
    }
    try {
        const user = await admin.auth().createUser({ email, password, displayName: name })
        return res.status(201).json({
            msg: "User created successfully",
            uid: user.uid,
            email: user.email,
            name: user.displayName
        });
    } catch (error) {
        res.status(401).json({
            msg: "Unable to create the user"
        })
    }

}

exports.signIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || typeof email !== 'string' || !email.includes("@")) {
        return res.status(400).json({ msg: "Error in email" })
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ msg: "Error in password" })
    }

    try {
        const api_key = process.env.apiKey
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`, { email, password, returnSecureToken: true })
        res.json({
            uid: response.data.localId,
            email: response.data.email,
            idToken: response.data.idToken,
            refreshToken: response.data.refreshToken
        })
    } catch (error) {
        res.status(401).json({
            msg: "Unable to sign in"
        })

    }
}

