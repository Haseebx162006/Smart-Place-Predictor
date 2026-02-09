const auth_routes = require('./src/routes/auth_routes')
const emotion_routes = require('./src/routes/emotion_routes')
const history_routes = require('./src/routes/history_routes')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/get', (req, res) => {
    res.send("Hello kya hal ha")
})
app.use("/api/auth", auth_routes)
app.use("/api/emotion", emotion_routes)
app.use("/api/history", history_routes)


module.exports = app