// src/components/Dashboard.tsx
import React from 'react';
import CourseCard from './CourseCard';
import StudentEnrollmentChart from './StudentEnrollmentChart';
import { draftCourses, publishedCourses } from '../DummyData/adminData';

const Dashboard = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Hello, UserName</h1>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Draft Courses</h2>
        <div className="grid grid-cols-2 gap-4">
          {draftCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Published Courses</h2>
        <div className="grid grid-cols-2 gap-4">
          {publishedCourses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
      <StudentEnrollmentChart />
    </div>
  );
};

export default Dashboard;
