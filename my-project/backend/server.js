import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import allotmentRoutes from './routes/allotmentRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// API Routes
app.use('/api/allotments', allotmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});