const mongoose= require('mongoose')


// this a async function because am connecting with an external component which is a database

const db= async()=>{
    try {
       await mongoose.connect(
        process.env.DB_URL
       )
    } catch (err) {
        console.error(err)
    }
}


module.exports= db