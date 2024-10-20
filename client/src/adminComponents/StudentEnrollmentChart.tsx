import React, { useEffect } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; // Import ChartJS and registerables

// Register all necessary components from Chart.js
ChartJS.register(...registerables);

const StudentEnrollmentChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category' as const, // Specify the scale type for x-axis
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="font-bold text-xl mb-4">Students Enrolled</h2>
      <Bar data={data} options={options} /> {/* Pass options to Bar component */}
    </div>
  );
};

export default StudentEnrollmentChart;
