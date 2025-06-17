import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function CircularChart({ dataPercentage } : { dataPercentage:number }) {
    const data = () => {
        const progressValue = dataPercentage
        const remainingValue = 100 - progressValue
        return {
            datasets: [{
                data: [progressValue, remainingValue],
                backgroundColor: [
                    'rgb(255, 165, 0)',
                    'rgba(71, 71, 71, 0.32)'
                ],
                borderColor: [
                    'rgb(255, 165, 0)',
                    'rgba(71, 71, 71, 0.32)',
                ],
                borderWidth: 0,
            }]
        }
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        rotation: -90,
        circumference: 360,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    }

    return (
        <Doughnut options={options} data={data()} />
    )

}

export default CircularChart
