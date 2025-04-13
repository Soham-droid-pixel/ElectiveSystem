import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAllotment } from '../context/AllotmentContext';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const AllotmentPieChart = () => {
  const { analyticsData } = useAllotment();
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Dynamically update pieData when analyticsData changes
    if (analyticsData?.pie) {
      setPieData(analyticsData.pie);
    }
  }, [analyticsData]);

  if (!pieData || pieData.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No pie chart data to display.</p>;
  }

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} Students`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllotmentPieChart;