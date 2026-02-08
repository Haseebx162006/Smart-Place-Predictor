const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { emotionDetector } = require('../controller/emotioncontroller');
const { verify } = require('../middleware/verify_token');

router.post('/detect', verify, upload.single('image'), emotionDetector);

module.exports = router;
