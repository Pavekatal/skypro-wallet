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

const Analytics = () => {
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
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} ₽`,
        },
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
    },
  };

  // Кастомный плагин для отображения значений над колонками
  const showValuesPlugin = {
    id: 'showValues',
    afterDraw(chart) {
      const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = '#333';

      data.datasets[0].data.forEach((value, index) => {
        const xPos = x.getPixelForValue(index);
        const yPos = y.getPixelForValue(value) - 5; // Отступ от верха колонки

        ctx.fillText(`${value} ₽`, xPos, yPos);
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
      {/* Заголовок */}
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
          Расходы за 10 июля 2024
        </div>
      </div>

      {/* Контейнер для диаграммы */}
      <div style={{ 
        height: 'calc(100% - 60px)',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f8f9fa',
        padding: '12px',
      }}>
        <Bar 
          data={data} 
          options={options} 
          plugins={[showValuesPlugin]} // Подключаем плагин
        />
      </div>
    </div>
  );
};

export default Analytics;