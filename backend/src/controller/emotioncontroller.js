const axios = require('axios');
const FormData= require('form-data')
const fs= require('fs')


exports.emotionDetector= async(req,res)=>{
    // multer store pic on disk so

    try {
        const imagePath= req.file.path

        const form = new FormData()

        form.append("image",fs.createReadStream(fs))

        const response= await axios.post("http://emotion-ml:8000/predict", form, {headers:form.getHeaders()}  )
        const {emotion,confidence}= response.body

        if(confidence<0.5){
            return res.json({
                emotion:"neutral",note:"low confidence"
            })
        }

        return res.json({emotion})

    } catch (error) {
        return res.status(500).json({
            msg:"Error in emotion service"
        })
    }

}