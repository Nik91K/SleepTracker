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

function LineChart ({ sleepData, backgroundColor, chartTitle, chartLabel, yValue }: { sleepData: number[], backgroundColor: string, chartTitle:string, chartLabel:string, yValue?: (value: number | string) => string  }) {
    const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', ' Неділя'];
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: chartTitle,
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
            },
            ticks: {
                callback: function (value: number | string) {
                    return yValue ? yValue(value) : value
                }
            }
        }}
    }

    const data = {
        labels,
            datasets: [
            {
                label: chartLabel,
                data: sleepData,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                fill: false,
                tension: 0.4,
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
