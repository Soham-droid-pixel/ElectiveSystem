import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: [String], required: true }, // Array of course preferences
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;