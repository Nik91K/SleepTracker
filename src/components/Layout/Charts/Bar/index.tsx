import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function MyBarChart({ sleepData, titleText }: { sleepData: number[], titleText: string }) {
  const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', ' Неділя'];
    const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Години сну',
        data: sleepData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default MyBarChart
