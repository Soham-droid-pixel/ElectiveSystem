const Student = require('../models/Student');
const Allotment = require('../models/Allotment');

const allotOne = (c1, c2, counts, threshold = 20) => {
  if (c1 && counts[c1] >= threshold) return c1;
  if (c2 && counts[c2] >= threshold) return c2;
  return 'Not Allotted';
};

const allotCourses = async () => {
  const students = await Student.find({});
  const counts = {};

  students.forEach((s) => {
    [s.creditTrack1, s.creditTrack2, s.pecl1_1, s.pecl1_2, s.pecl2_1, s.pecl2_2, s.open1, s.open2].forEach((c) => {
      if (c) counts[c] = (counts[c] || 0) + 1;
    });
  });

  for (let s of students) {
    const allot = {
      studentId: s._id,
      allottedCreditTrack: allotOne(s.creditTrack1, s.creditTrack2, counts),
      allottedPECL1: allotOne(s.pecl1_1, s.pecl1_2, counts),
      allottedPECL2: allotOne(s.pecl2_1, s.pecl2_2, counts),
      allottedOpen: allotOne(s.open1, s.open2, counts),
      mdm: s.mdm || 'Not Chosen',
      honors: s.honors || 'N/A',
      minors: s.minors || 'N/A',
      remark: '',
    };

    const allNotAllotted = [allot.allottedCreditTrack, allot.allottedPECL1, allot.allottedPECL2, allot.allottedOpen]
      .every(val => val === 'Not Allotted');

    if (allNotAllotted && (!s.honors && !s.minors)) {
      allot.remark = 'Notify Admin';
    }

    await Allotment.create(allot);
  }

  return true;
};

module.exports = { allotCourses };
