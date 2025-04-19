const express = require('express');
const { generateAllotments } = require('../controllers/allotmentController');

const router = express.Router();

router.get('/generate', generateAllotments);

module.exports = router;
