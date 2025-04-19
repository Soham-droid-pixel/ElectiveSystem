const { allotCourses } = require('../utils/allotmentLogic');

const generateAllotments = async (req, res) => {
  try {
    await allotCourses();
    res.status(200).json({ message: 'Allotment completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { generateAllotments };
