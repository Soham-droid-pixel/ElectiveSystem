import React, { useContext, useState } from 'react';
import { AllotmentContext } from '../context/AllotmentContext';

const AllotmentTable = () => {
  const { allotmentData } = useContext(AllotmentContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = allotmentData?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadCSV = () => {
    const headers = [
      'Student ID',
      'Name',
      '1st Choice',
      '2nd Choice',
      '3rd Choice',
      'Allotted Course',
      'Preference Allotted',
    ];

    const rows = filteredData.map((student) => [
      student.studentId,
      student.name,
      student.firstChoice,
      student.secondChoice,
      student.thirdChoice,
      student.allottedCourse,
      student.preferenceAllotted,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(String).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'elective_allotment.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!allotmentData || allotmentData.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No allotment data to display.</p>;
  }

  return (
    <div className="mt-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by Student ID or Name"
          className="w-full sm:w-1/3 p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleDownloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full text-sm text-center border border-gray-200">
          <thead className="bg-blue-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="p-3 border">Student ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">1st Choice</th>
              <th className="p-3 border">2nd Choice</th>
              <th className="p-3 border">3rd Choice</th>
              <th className="p-3 border">Allotted Course</th>
              <th className="p-3 border">Preference Allotted</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition duration-150`}
              >
                <td className="p-2 border">{student.studentId}</td>
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.firstChoice}</td>
                <td className="p-2 border">{student.secondChoice}</td>
                <td className="p-2 border">{student.thirdChoice}</td>
                <td className="p-2 border font-medium text-green-700">
                  {student.allottedCourse}
                </td>
                <td className="p-2 border text-sm text-gray-600">
                  {student.preferenceAllotted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllotmentTable;
