import React, { useEffect, useState } from 'react';
import { useAllotment } from '../context/AllotmentContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUploader from '../components/FileUploader';
import AllotmentTable from '../components/AllotmentTable';
import CourseBarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DroppedCoursesList from '../components/DroppedCoursesList';

const Dashboard = () => {
  // Destructure with safe defaults
  const { allotmentData = [], analyticsData = { bar: [], pie: [] } } = useAllotment();
  
  // State declarations remain the same
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [droppedCoursesCount, setDroppedCoursesCount] = useState(0);

  // Create safe reference to data
  const safeAllotmentData = Array.isArray(allotmentData) ? allotmentData : [];
  const safeAnalyticsData = {
    bar: Array.isArray(analyticsData?.bar) ? analyticsData.bar : [],
    pie: Array.isArray(analyticsData?.pie) ? analyticsData.pie : []
  };

  useEffect(() => {
    // Calculations using safe references
    setTotalStudents(safeAllotmentData.length);

    const uniqueCourses = new Set(
      safeAllotmentData.map((item) => item?.allottedCourse).filter(Boolean)
    );
    setTotalCourses(uniqueCourses.size);

    const droppedCourses = safeAllotmentData.filter(
      (item) => !item?.allottedCourse
    );
    setDroppedCoursesCount(droppedCourses.length);
  }, [safeAllotmentData]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-4 py-6 sm:px-8 lg:px-16 transition-all duration-300">
        {/* File Upload Section - unchanged */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Upload Allotment File
          </h2>
          <FileUploader />
        </section>

        {/* Summary Stats - unchanged */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">
              Courses Offered
            </h3>
            <p className="text-2xl font-bold text-green-600">{totalCourses}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">
              Dropped Courses
            </h3>
            <p className="text-2xl font-bold text-red-600">
              {droppedCoursesCount}
            </p>
          </div>
        </section>

        {/* Allotment Table - using safe data */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Allotment Table
          </h2>
          <AllotmentTable data={safeAllotmentData} />
        </section>

        {/* Charts - using safe data */}
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Allotment Bar Chart
            </h2>
            <CourseBarChart data={safeAnalyticsData.bar} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Preferences Pie Chart
            </h2>
            <PieChart data={safeAnalyticsData.pie} />
          </div>
        </section>

        {/* Dropped Courses - using safe data */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Dropped Courses
          </h2>
          <DroppedCoursesList 
            data={safeAllotmentData.filter((item) => !item?.allottedCourse)} 
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;