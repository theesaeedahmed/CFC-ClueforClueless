import { Line } from 'react-chartjs-2';

export default function EnrollmentChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [20, 30, 40, 50, 60],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
}
