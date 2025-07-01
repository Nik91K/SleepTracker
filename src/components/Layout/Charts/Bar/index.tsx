import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ sleepData, backgroundColor, chartTitle, chartLabel, yValue }: { sleepData: number[], backgroundColor: string, chartTitle: string, chartLabel: string, yValue?: (value: number | string) => string }) {
  const labels = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця', 'Субота', 'Неділя']
  const [barThickness, setBarThickness] = useState(30)

  useEffect(() => {
    const handleResize = () => {
      setBarThickness(window.innerWidth < 600 ? 15 : 30)
    };

    handleResize();
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

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
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: true, color: '#444' },
        ticks: {
          callback: (value: number | string) => (yValue ? yValue(value) : value),
        },
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: sleepData,
        backgroundColor,
        barThickness,
        borderRadius: {
          topLeft: 15,
          topRight: 15,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  }

  return (
      <Bar options={options} data={data} />
  )
}

export default BarChart;
