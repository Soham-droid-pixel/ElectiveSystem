const fs = require('fs');
const csv = require('csv-parser');
const Student = require('../models/Student');

const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const students = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        students.push({
          name: row['Name'],
          rollNumber: row['Roll Number'],
          email: row['Email'],
          creditTrack1: row['Credit Track 1'],
          creditTrack2: row['Credit Track 2'],
          pecl1_1: row['PECL1_1'],
          pecl1_2: row['PECL1_2'],
          pecl2_1: row['PECL2_1'],
          pecl2_2: row['PECL2_2'],
          open1: row['Open 1'],
          open2: row['Open 2'],
          honors: row['Honors'],
          minors: row['Minors'],
          mdm: row['MDM'],
        });
      })
      .on('end', async () => {
        await Student.insertMany(students);
        resolve();
      })
      .on('error', reject);
  });
};

module.exports = { parseCSV };
