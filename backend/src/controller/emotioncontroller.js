const axios = require('axios');
const FormData = require('form-data')
const fs = require('fs')
const { recommendPlaces } = require('../controller/placeRecommender')

exports.emotionDetector = async (req, res) => {
    // multer store pic on disk so
    try {
        const imagePath = req.file.path

        const { lat, lng } = req.body

        if (!lat || !lng) {
            return res.status(400).json({ error: "Location required" })
        }
        console.log("Received detection request");
        console.log("Image path:", imagePath);
        console.log("Location:", lat, lng);

        const form = new FormData()
        form.append("image", fs.createReadStream(imagePath))

        console.log("Sending request to Emotion Service (http://localhost:8000/predict)...");
        const response = await axios.post("http://localhost:8000/predict", form, { headers: form.getHeaders() })
        console.log("Emotion Service Response:", response.data);

        const { emotion, confidence } = response.data

        if (confidence < 0.5) {
            console.log("Low confidence detection:", confidence);
            return res.json({
                emotion: "neutral", note: "low confidence"
            })
        }

        console.log("Fetching place recommendations for:", emotion);
        const places = await recommendPlaces(emotion, lat, lng)
        console.log("Places found:", places.length);

        return res.json({ emotion, confidence, places })

    } catch (error) {
        return res.status(500).json({
            msg: "Error in emotion service"
        })
    }

}