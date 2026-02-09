const express = require('express');
const router = express.Router();
const { getHistory } = require('../controller/historycontroller');
const { verify } = require('../middleware/verify_token');

router.get('/', verify, getHistory);

module.exports = router;
