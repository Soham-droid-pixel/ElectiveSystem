import React, { useContext } from 'react';
import { AllotmentContext } from '../context/AllotmentContext';

const AllotmentTable = () => {
  const { allotmentData } = useContext(AllotmentContext);

  if (!allotmentData || allotmentData.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No allotment data to display.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
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
          {allotmentData.map((student, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{student.studentId}</td>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.firstChoice}</td>
              <td className="p-2 border">{student.secondChoice}</td>
              <td className="p-2 border">{student.thirdChoice}</td>
              <td className="p-2 border">{student.allottedCourse}</td>
              <td className="p-2 border">{student.preferenceAllotted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllotmentTable;
