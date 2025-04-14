const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');
const allotmentRoutes = require('./routes/allotmentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Static folder for uploaded/downloaded files if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/allotments', allotmentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
