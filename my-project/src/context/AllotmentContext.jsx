import React, { createContext, useState, useContext } from 'react';

export const AllotmentContext = createContext();

export const AllotmentProvider = ({ children }) => {
  const [allotmentData] = useState([
    {
      studentId: 'S101',
      name: 'Alice',
      firstChoice: 'AI & ML',
      secondChoice: 'Web Dev',
      thirdChoice: 'Cloud',
      allottedCourse: 'AI & ML',
      preferenceAllotted: '1st',
    },
    {
      studentId: 'S102',
      name: 'Bob',
      firstChoice: 'Web Dev',
      secondChoice: 'Cloud',
      thirdChoice: 'AI & ML',
      allottedCourse: 'Web Dev',
      preferenceAllotted: '1st',
    },
    {
      studentId: 'S103',
      name: 'Charlie',
      firstChoice: 'Cloud',
      secondChoice: 'AI & ML',
      thirdChoice: 'Web Dev',
      allottedCourse: 'AI & ML',
      preferenceAllotted: '2nd',
    }
  ]);

  const [analyticsData] = useState({
    pie: [
      { label: '1st Preference', value: 2 },
      { label: '2nd Preference', value: 1 }
    ],
    bar: [
      {
        course: 'AI & ML',
        first: 1,
        second: 1,
        third: 0
      },
      {
        course: 'Web Dev',
        first: 1,
        second: 0,
        third: 0
      },
      {
        course: 'Cloud',
        first: 1,
        second: 0,
        third: 1
      }
    ]
  });

  return (
    <AllotmentContext.Provider value={{ allotmentData, analyticsData }}>
      {children}
    </AllotmentContext.Provider>
  );
};

export const useAllotment = () => useContext(AllotmentContext);
