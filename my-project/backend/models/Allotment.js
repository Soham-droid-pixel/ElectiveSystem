const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  allottedCreditTrack: String,
  allottedPECL1: String,
  allottedPECL2: String,
  allottedOpen: String,
  mdm: String,
  honors: String,
  minors: String,
  remark: String,
});

module.exports = mongoose.model('Allotment', allotmentSchema);
