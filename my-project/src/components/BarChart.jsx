import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAllotment } from '../context/AllotmentContext';

const CourseBarChart = () => {
  const { analyticsData } = useAllotment();
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Dynamically update barData when analyticsData changes
    if (analyticsData?.bar) {
      setBarData(analyticsData.bar);
    }
  }, [analyticsData]);

  if (!barData || barData.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No bar chart data available.</p>;
  }

  return (
    <div className="w-full h-[320px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value, name) => [
              `${value} Students`,
              name === 'first' ? '1st Choice' : name === 'second' ? '2nd Choice' : '3rd Choice'
            ]}
          />
          <Legend
            formatter={(value) => {
              if (value === 'first') return '1st Choice';
              if (value === 'second') return '2nd Choice';
              if (value === 'third') return '3rd Choice';
              return value;
            }}
          />
          <Bar dataKey="first" fill="#1d4ed8" />
          <Bar dataKey="second" fill="#60a5fa" />
          <Bar dataKey="third" fill="#93c5fd" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseBarChart;
