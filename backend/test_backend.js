const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testBackend() {
    const url = 'http://localhost:3000/api/emotion/detect';
    // Use an existing image from the uploads folder for testing
    const imagePath = 'm:\\Smart-Predictor\\code\\backend\\uploads\\1770581649109.jpg';

    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));
    form.append('lat', '33.6844');
    form.append('lng', '73.0479');

    console.log("Sending request to backend...");
    try {
        const response = await axios.post(url, form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Test Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

testBackend();
