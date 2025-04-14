const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const Allotment = require('../models/Allotment');
const { allotStudents } = require('../utils/allotmentLogic');
const parseCSV = require('../utils/csvParser');

let latestAllotment = [];

const uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'CSV file missing' });
  }

  try {
    // Parse uploaded CSV
    const rows = await parseCSV(file.path);
    fs.unlinkSync(file.path); // Delete file after processing

    const formattedData = rows.map((data) => ({
      studentId: data['Student ID'],
      name: data['Name'],
      firstChoice: data['1st Choice'],
      secondChoice: data['2nd Choice'],
      thirdChoice: data['3rd Choice'],
    }));

    const { finalAllotment } = allotStudents(formattedData);
    latestAllotment = finalAllotment;

    const docs = finalAllotment.map((entry) => ({
      studentId: entry.studentId,
      allottedCourse: entry.allottedCourse,
      preferenceAllotted: entry.preferenceAllotted,
    }));

    await Allotment.deleteMany({});
    await Allotment.insertMany(docs);

    res.json({ message: 'CSV uploaded, processed and saved to DB successfully!' });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'CSV processing or DB operation failed' });
  }
};

const getAllotmentData = async (req, res) => {
  try {
    const data = await Allotment.find().lean();
    res.json(data);
  } catch (err) {
    console.error('Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch allotment data' });
  }
};

const downloadCSV = async (req, res) => {
  try {
    const data = await Allotment.find().lean();

    if (!data.length) {
      return res.status(404).json({ error: 'No data available to download' });
    }

    const header = ['Student ID', 'Allotted Course', 'Preference Allotted'];
    const rows = data.map((s) =>
      [s.studentId, s.allottedCourse, s.preferenceAllotted].join(',')
    );
    const content = [header.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=allotment.csv');
    res.status(200).send(content);
  } catch (err) {
    console.error('Download Error:', err);
    res.status(500).json({ error: 'Failed to generate CSV' });
  }
};

module.exports = {
  uploadCSV,
  getAllotmentData,
  downloadCSV,
};
