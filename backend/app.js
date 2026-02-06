const auth_routes= require('./src/routes/auth_routes')
const express= require('express')
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/get', (req,res)=>{
    res.send("Hello kya hal ha")
})
app.use("/api/auth",auth_routes)


module.exports= app