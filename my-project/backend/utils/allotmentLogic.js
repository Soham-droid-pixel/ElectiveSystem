// allotmentLogic.js

const allotStudents = (students, minRequired = 20) => {
    const courseCount = {};
    const finalAllotment = [];
  
    // First round - count all first choices
    students.forEach((s) => {
      const course = s.firstChoice;
      courseCount[course] = (courseCount[course] || 0) + 1;
    });
  
    // Remove courses with < minRequired students
    const validCourses = Object.keys(courseCount).filter(
      (c) => courseCount[c] >= minRequired
    );
  
    // Assign students based on choices
    students.forEach((s) => {
      let allotted = null;
      let preference = null;
  
      if (validCourses.includes(s.firstChoice)) {
        allotted = s.firstChoice;
        preference = '1st';
      } else if (validCourses.includes(s.secondChoice)) {
        allotted = s.secondChoice;
        preference = '2nd';
      } else if (validCourses.includes(s.thirdChoice)) {
        allotted = s.thirdChoice;
        preference = '3rd';
      }
  
      finalAllotment.push({
        studentId: s.studentId,
        name: s.name,
        firstChoice: s.firstChoice,
        secondChoice: s.secondChoice,
        thirdChoice: s.thirdChoice,
        allottedCourse: allotted || 'None',
        preferenceAllotted: preference || 'Not Allotted',
      });
    });
  
    return { finalAllotment, validCourses };
  };
  
  module.exports = { allotStudents };
  