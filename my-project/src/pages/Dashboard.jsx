import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUploader from '../components/FileUploader';
import AllotmentTable from '../components/AllotmentTable';
import CourseBarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import DroppedCoursesList from '../components/DroppedCoursesList';

const Dashboard = () => {
  const totalStudents = 120; // Example: Replace with dynamic value
  const totalCourses = 8;
  const droppedCoursesCount = 3;

  // Example mock data for testing (replace with real data from context or API)
  const allotments = [
    {
      studentId: 'S101',
      firstChoice: 'AI & ML',
      secondChoice: 'Web Dev',
      thirdChoice: 'Cloud',
      allotted: 'AI & ML',
      preferenceAllotted: '1st',
    },
    {
      studentId: 'S102',
      firstChoice: 'Web Dev',
      secondChoice: 'Cloud',
      thirdChoice: 'AI & ML',
      allotted: 'Web Dev',
      preferenceAllotted: '1st',
    },
    {
      studentId: 'S103',
      firstChoice: 'Cloud',
      secondChoice: 'AI & ML',
      thirdChoice: 'Web Dev',
      allotted: 'AI & ML',
      preferenceAllotted: '2nd',
    },
    {
      studentId: 'S104',
      firstChoice: 'AI & ML',
      secondChoice: 'Cloud',
      thirdChoice: 'Web Dev',
      allotted: 'Cloud',
      preferenceAllotted: '2nd',
    },
  ];

  const generateBarChartData = (allotments) => {
    const courseMap = {};

    allotments.forEach(({ firstChoice, secondChoice, thirdChoice }) => {
      if (!courseMap[firstChoice]) courseMap[firstChoice] = { course: firstChoice, first: 0, second: 0, third: 0 };
      if (!courseMap[secondChoice]) courseMap[secondChoice] = { course: secondChoice, first: 0, second: 0, third: 0 };
      if (!courseMap[thirdChoice]) courseMap[thirdChoice] = { course: thirdChoice, first: 0, second: 0, third: 0 };

      courseMap[firstChoice].first += 1;
      courseMap[secondChoice].second += 1;
      courseMap[thirdChoice].third += 1;
    });

    return Object.values(courseMap);
  };

  const barChartData = generateBarChartData(allotments);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-4 py-6 sm:px-8 lg:px-16 transition-all duration-300">
        {/* File Upload Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Allotment File</h2>
          <FileUploader />
        </section>

        {/* Summary Stats */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">Courses Offered</h3>
            <p className="text-2xl font-bold text-green-600">{totalCourses}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-600">Dropped Courses</h3>
            <p className="text-2xl font-bold text-red-600">{droppedCoursesCount}</p>
          </div>
        </section>

        {/* Allotment Table */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Allotment Table</h2>
          <AllotmentTable />
        </section>

        {/* Charts */}
        <section className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Allotment Bar Chart</h2>
            <CourseBarChart data={barChartData} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Preferences Pie Chart</h2>
            <PieChart />
          </div>
        </section>

        {/* Dropped Courses */}
        <section className="mt-8 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Dropped Courses</h2>
          <DroppedCoursesList />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
