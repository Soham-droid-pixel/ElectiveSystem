import React, { useEffect, useState } from 'react';
import { useAllotment } from '../context/AllotmentContext';

const DroppedCoursesList = () => {
  const { allotmentData } = useAllotment();
  const [droppedCourses, setDroppedCourses] = useState([]);

  useEffect(() => {
    // Dynamically calculate dropped courses based on allotmentData
    if (allotmentData.length > 0) {
      const dropped = allotmentData
        .filter((item) => !item.allottedCourse)
        .map((item) => item.firstChoice); // Assuming firstChoice is the dropped course
      setDroppedCourses(dropped);
    }
  }, [allotmentData]);

  if (droppedCourses.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No dropped courses to display.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Dropped Courses</h3>
      <ul className="list-disc list-inside">
        {droppedCourses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default DroppedCoursesList;
