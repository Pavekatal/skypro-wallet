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
import { useMemo } from 'react';

// Регистрируем необходимые модули Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Аналитика расходов за выбранный период
 * Показывает сумму и столбчатую диаграмму по категориям
 */
const Analytics = ({ period, transactions = [], error }) => {
  // Категории для графика (ключи на английском)
  const categories = [
    'food',
    'transport',
    'housing',
    'entertainment',
    'education',
    'others',
  ];

  // Переводы категорий для отображения
  const categoryLabels = {
    food: 'Еда',
    transport: 'Транспорт',
    housing: 'Жилье',
    entertainment: 'Развлечения',
    education: 'Образование',
    others: 'Другое',
  };

  // Функция для нормализации категории
  const normalizeCategory = (cat) => (cat || '').trim().toLowerCase();

  // Маппинг серверных категорий к ключам графика
  const categoryMap = {
    food: 'food',
    transport: 'transport',
    housing: 'housing',
    entertainment: 'entertainment',
    education: 'education',
    others: 'others',
    other: 'others',
  };

  // Группировка расходов по категориям
  const categorySums = useMemo(() => {
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return Array(categories.length).fill(0);
    }
    const sums = Array(categories.length).fill(0);
    transactions.forEach((t) => {
      const key = categoryMap[normalizeCategory(t.category)];
      const idx = categories.indexOf(key);
      if (idx !== -1) {
        sums[idx] += Number(t.sum) || 0;
      }
    });
    return sums;
  }, [transactions, categories]);

  // Максимальное значение для ограничения роста столбиков (80% высоты)
  const maxValue = useMemo(() => Math.max(...categorySums), [categorySums]);
  const yMax = useMemo(() => maxValue > 0 ? maxValue / 0.87 : 10, [maxValue]);

  // Сумма всех расходов
  const total = useMemo(() => categorySums.reduce((a, b) => a + b, 0), [categorySums]);

  const chartData = useMemo(() => ({
    labels: categories.map((key) => categoryLabels[key]),
    datasets: [
      {
        label: 'Расходы',
        data: categorySums,
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
      },
    ],
  }), [categories, categoryLabels, categorySums]);

  // Настройки графика
  const chartOptions = {
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
        display: false,
        beginAtZero: true,
        max: yMax,
      },
      x: {
        grid: { display: false },
        ticks: { padding: 0 },
      },
    },
    layout: { padding: 0 },
    animation: { duration: 1000 },
  };

  // Плагин для отображения значений над столбцами
  const showValuesPlugin = {
    id: 'showValues',
    afterDatasetsDraw(chart) {
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
          // Текст всегда над столбиком, но не выходит за пределы графика
          const yPosRaw = yScale.getPixelForValue(value) - 30;
          const yZero = yScale.getPixelForValue(0) - 8;
          const yPos = Math.max(Math.min(yPosRaw, yZero), top + 8);
          if (xPos >= left && xPos <= right && yPos >= top && yPos <= bottom) {
            ctx.fillText(`${value} ₽`, xPos, yPos);
          }
        } catch (error) {
          console.error('Ошибка при отрисовке значения:', error);
        }
      });
    },
  };

  // --- UI ---
  return (
    <div
      style={{
        width: '789px',
        height: '540px',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
      }}
    >
      {error && (
        <div style={{
          color: 'red',
          fontWeight: 'bold',
          marginBottom: '16px',
          fontSize: '18px',
          textAlign: 'center',
        }}>
          {error === true
            ? 'Ошибка загрузки данных. Проверьте соединение с интернетом или попробуйте позже.'
            : error}
        </div>
      )}
      {/* Сумма расходов и подпись периода */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '4px',
          }}
        >
          {total.toLocaleString()} ₽
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>
          {period
            ? `Расходы за ${period}`
            : 'Выберите период в календаре'}
        </div>
      </div>

      {/* График расходов по категориям */}
      <div
        style={{
          height: 'calc(100% - 60px)',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'white',
          padding: '12px',
        }}
      >
        <Bar data={chartData} options={chartOptions} plugins={[showValuesPlugin]} />
      </div>
    </div>
  );
};

export default Analytics;