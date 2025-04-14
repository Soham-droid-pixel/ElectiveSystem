// allotmentRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  uploadCSV,
  getAllotmentData,
  downloadCSV,
} = require('../controllers/allotmentController');

router.post('/upload', upload.single('file'), uploadCSV);
router.get('/process', getAllotmentData);
router.get('/download', downloadCSV);

module.exports = router;
