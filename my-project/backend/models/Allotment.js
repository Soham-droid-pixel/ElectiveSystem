const mongoose = require('mongoose');
const dotenv = require('dotenv');

const allotmentSchema = mongoose.Schema({
  studentId: { type: String, required: true },
  allottedCourse: { type: String, required: true },
  preferenceAllotted: { type: String, required: true }, // e.g., "1st", "2nd", "3rd"
}, { timestamps: true });

const Allotment = mongoose.model('Allotment', allotmentSchema);

module.exports = Allotment;
dotenv.config();