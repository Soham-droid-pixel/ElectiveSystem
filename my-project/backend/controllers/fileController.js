const { parseCSV } = require('../utils/csvParser');

const uploadCSV = async (req, res) => {
  try {
    await parseCSV(req.file.path);
    res.status(200).json({ message: 'CSV parsed and data inserted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadCSV };
