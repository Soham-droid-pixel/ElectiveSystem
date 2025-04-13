import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  description: { type: String },
  availableSeats: { type: Number, required: true },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;