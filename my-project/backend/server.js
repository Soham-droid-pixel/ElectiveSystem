const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Routes
const allotmentRoutes = require('./routes/allotmentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from your frontend
  credentials: true,              // Allow cookies, Authorization headers, etc.
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse JSON requests

// Serve static files from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Endpoints
app.use('/api/allotments', allotmentRoutes);
app.use('/api/upload', uploadRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Elective Allotment System API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
