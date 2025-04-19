const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  email: String,
  creditTrack1: String,
  creditTrack2: String,
  pecl1_1: String,
  pecl1_2: String,
  pecl2_1: String,
  pecl2_2: String,
  open1: String,
  open2: String,
  honors: String,
  minors: String,
  mdm: String,
});

module.exports = mongoose.model('Student', studentSchema);
