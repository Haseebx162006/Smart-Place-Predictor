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

        console.log("Sending request to Emotion Service (http://127.0.0.1:8000/predict)...");
        const response = await axios.post("http://127.0.0.1:8000/predict", form, { headers: form.getHeaders() })
        console.log("Emotion Service Response:", response.data);

        const { emotion, confidence } = response.data

        if (confidence < 0.5) {
            console.log("Low confidence detection:", confidence);
            // Continue with neutral or detected emotion but warn? 
            // Better to show something than nothing.
            // We can overwrite emotion to neutral if we want to be safe, 
            // but the python script already does some mapping.
            // Let's just log and proceed.
        }

        console.log("Fetching place recommendations for:", emotion);
        const places = await recommendPlaces(emotion, lat, lng)
        console.log("Places found:", places.length);

        // --- SAVE TO HISTORY ---
        try {
            const db = admin.firestore();
            const historyRef = db.collection('users').doc(req.user.uid).collection('history');

            await historyRef.add({
                emotion,
                confidence,
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                },
                places: places.map(p => ({
                    name: p.name,
                    category: p.category,
                    lat: p.lat,
                    lng: p.lng
                })),
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log("History record saved to Firestore for user:", req.user.uid);
        } catch (dbError) {
            console.error("FIRESTORE ERROR:", dbError.message);
            // We don't return error here because we want to return the result to the user even if history fails
        }
        // -----------------------

        return res.json({ emotion, confidence, places })

    } catch (error) {
        console.error("DETECTION ERROR:", error.message);
        if (error.response) {
            console.error("Service Response Error:", error.response.data);
        }
        return res.status(500).json({
            msg: "Error in emotion service",
            error: error.message,
            detail: error.response?.data
        })
    }

}