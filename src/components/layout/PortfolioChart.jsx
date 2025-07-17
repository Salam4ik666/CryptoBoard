import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCrypto } from '../../context/crypto-context.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

function generateColors(n) {
  const colors = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.floor((360 / n) * i); // равномерное распределение по кругу
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
}

const PortfolioChart = () => {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount),
        backgroundColor: generateColors(assets.length),
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '400px', marginBottom: '1rem' }}>
      <Pie data={data}></Pie>
    </div>
  );
};

export default PortfolioChart;
