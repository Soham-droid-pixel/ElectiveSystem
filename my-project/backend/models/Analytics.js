import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  course: { type: String, required: true },
  firstChoiceCount: { type: Number, default: 0 },
  secondChoiceCount: { type: Number, default: 0 },
  thirdChoiceCount: { type: Number, default: 0 },
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;