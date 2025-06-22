import './style.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart ({ sleepData, backgroundColor }: { sleepData: number[], backgroundColor: string }) {
    const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', ' Неділя'];
    const options = {
        responsive: true,
        plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
        }},
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
        }}
    }

    const data = {
        labels,
            datasets: [
            {
                label: 'Якість сну',
                data: sleepData,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                fill: false,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            ],
    };

    return (
        <Line options={options} data={data} />
    )
}

export default LineChart
