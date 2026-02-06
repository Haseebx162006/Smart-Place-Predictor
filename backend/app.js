import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const express= require('express')
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/get', (req,res)=>{
    res.send("Hello kya hal ha")
})
const firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

module.exports= app