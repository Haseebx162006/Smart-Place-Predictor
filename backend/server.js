require('dotenv').config()

const app= require('./app')
const db= require('./src/configs/database')

db()

app.listen(
    process.env.PORT || 3000, ()=>{
        console.error("Server is running")
    }
)