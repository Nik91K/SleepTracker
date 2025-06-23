import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, scales, Colors} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function BarChart({ sleepData, backgroundColor, chartTitle, chartLabel }: { sleepData: number[], backgroundColor: string, chartTitle:string, chartLabel: string }) {
  const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', ' Неділя'];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: '#444',
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: sleepData,
        backgroundColor: backgroundColor,
        barThickness: 30,
        borderRadius: {
          topLeft: 15,
          topRight: 15,
          bottomLeft: 0,
          bottomRight: 0,
        }
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart
