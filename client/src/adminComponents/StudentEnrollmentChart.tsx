import React, { useEffect } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; 
// Register all necessary components from Chart.js
ChartJS.register(...registerables);

const StudentEnrollmentChart = () => {
  // Dummy data for multiple metrics
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], 
    datasets: [
      {
        label: 'Students Enrolled',
        data: [120, 190, 300, 400, 240], 
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
      },
      {
        label: 'Programs Completed',
        data: [80, 150, 200, 350, 180], 
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
      },
      {
        label: 'New Learners',
        data: [50, 70, 100, 150, 240], 
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category' as const, 
      },
      y: {
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="font-bold text-xl mb-4">Enrollment Overview</h2>
      {/* Bar chart with multiple datasets */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default StudentEnrollmentChart;
