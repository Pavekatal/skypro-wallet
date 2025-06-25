import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ period }) => {
  const data = {
    labels: ['Еда', 'Транспорт', 'Жилье', 'Развлечения', 'Образование', 'Другое'],
    datasets: [{
      label: 'Расходы',
      data: [3590, 1835, 50, 1250, 600, 2306],
      backgroundColor: [
        'rgb(217, 182, 255)',
        'rgb(255, 181, 61)',
        'rgb(110, 228, 254)',
        'rgb(176, 174, 255)',
        'rgb(188, 236, 48)',
        'rgb(255, 185, 184)',
      ],
      borderColor: [
        'rgb(217, 182, 255)',
        'rgb(255, 181, 61)',
        'rgb(110, 228, 254)',
        'rgb(176, 174, 255)',
        'rgb(188, 236, 48)',
        'rgb(255, 185, 184)',
      ],
      borderWidth: 1,
      borderRadius: 12,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} ₽`,
        },
      },
    },
    scales: {
      y: {
        display: false, // Полностью скрываем ось Y (вертикальную полоску с расходами)
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false, // Убираем сетку по оси X
        },
        ticks: {
          padding: 0, // Убираем отступы у подписей категорий
        },
      },
    },
    layout: {
      padding: 0, // Убираем все отступы
    },
    animation: {
      duration: 1000,
    },
  };

  const showValuesPlugin = {
    id: 'showValues',
    afterDraw(chart) {
      if (!chart || !chart.ctx || !chart.data || !chart.chartArea) return;
      
      const ctx = chart.ctx;
      const data = chart.data;
      const chartArea = chart.chartArea;
      
      const top = chartArea.top || 0;
      const bottom = chartArea.bottom || 0;
      const left = chartArea.left || 0;
      const right = chartArea.right || 0;
      
      if (!chart.scales || !chart.scales.x || !chart.scales.y) return;
      
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#333';
      
      if (!data.datasets || data.datasets.length === 0) return;
      
      const dataset = data.datasets[0];
      if (!dataset.data) return;
      
      dataset.data.forEach((value, index) => {
        try {
          const xPos = xScale.getPixelForValue(index);
          const yPos = yScale.getPixelForValue(value) - 5;
          
          if (xPos >= left && xPos <= right && yPos >= top && yPos <= bottom) {
            ctx.fillText(`${value} ₽`, xPos, yPos);
          }
        } catch (error) {
          console.error('Error drawing value:', error);
        }
      });
    }
  };

  return (
    <div style={{ 
      width: '789px',
      height: '540px',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '4px'
        }}>
          9 581 ₽
        </div>
        <div style={{ 
          color: '#666',
          fontSize: '14px'
        }}>
          {period ? `Расходы за ${period}` : 'Выберите период в календаре'}
        </div>
      </div>

      <div style={{ 
        height: 'calc(100% - 60px)',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'white', // Убрал серый фон
        padding: '12px',
      }}>
        <Bar 
          data={data} 
          options={options} 
          plugins={[showValuesPlugin]}
        />
      </div>
    </div>
  );
};

export default Analytics;