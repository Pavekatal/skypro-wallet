import axios from 'axios';
import { format, parse } from 'date-fns';

// Базовый URL API
const API_BASE_URL = 'https://wedev-api.sky.pro/api';

// Создание экземпляра axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Моковые данные (временные, для отображения таблицы)
let mockData = [
  {
    _id: '1',
    userId: 'mock-user-id',
    description: 'Пятерочка',
    category: 'Food',
    date: '7-3-2024',
    sum: 3500,
  },
  {
    _id: '2',
    userId: 'mock-user-id',
    description: 'Яндекс Такси',
    category: 'Transport',
    date: '7-3-2024',
    sum: 730,
  },
  {
    _id: '3',
    userId: 'mock-user-id',
    description: 'Аптека Вита',
    category: 'Others',
    date: '7-3-2024',
    sum: 1200,
  },
  {
    _id: '4',
    userId: 'mock-user-id',
    description: 'Бургер Кинг',
    category: 'Food',
    date: '7-3-2024',
    sum: 950,
  },
  {
    _id: '5',
    userId: 'mock-user-id',
    description: 'Деливери',
    category: 'Food',
    date: '7-2-2024',
    sum: 1320,
  },
  {
    _id: '6',
    userId: 'mock-user-id',
    description: 'Кофейня №1',
    category: 'Food',
    date: '7-2-2024',
    sum: 400,
  },
  {
    _id: '7',
    userId: 'mock-user-id',
    description: 'Билеты',
    category: 'Entertainment',
    date: '6-29-2024',
    sum: 600,
  },
  {
    _id: '8',
    userId: 'mock-user-id',
    description: 'Перекресток',
    category: 'Food',
    date: '6-29-2024',
    sum: 2360,
  },
  {
    _id: '9',
    userId: 'mock-user-id',
    description: 'Лукойл',
    category: 'Transport',
    date: '6-29-2024',
    sum: 1000,
  },
  {
    _id: '10',
    userId: 'mock-user-id',
    description: 'Летуаль',
    category: 'Others',
    date: '6-29-2024',
    sum: 4300,
  },
];

// Функция для добавления или обновления транзакции
export const addOrUpdateTransaction = async (transactionData, token) => {
  try {
    if (!token) throw new Error('Токен отсутствует');

    const formattedData = {
      description: transactionData.description,
      sum: Number(transactionData.sum),
      category: transactionData.category,
      date: format(new Date(transactionData.date), 'M-d-yyyy'),
    };

    // Временная работа с моковыми данными
    const updatedTransaction = {
      ...formattedData,
      _id: transactionData._id || String(Date.now()),
      userId: 'mock-user-id',
    };
    if (transactionData._id) {
      mockData = mockData.map((item) =>
        item._id === transactionData._id ? updatedTransaction : item
      );
    } else {
      mockData.push(updatedTransaction);
    }
    return mockData;

    // Раскомментировать для реального API, когда сервер будет работать
    /*
    const method = transactionData._id ? 'patch' : 'post';
    const url = transactionData._id ? `/transactions/${transactionData._id}` : '/transactions';
    const response = await apiClient({
      method,
      url,
      data: formattedData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
    */
  } catch (error) {
    console.error('Ошибка при добавлении/обновлении транзакции:', error);
    throw error.response?.data?.error || 'Ошибка сервера';
  }
};

// Функция для получения списка транзакций
export const getTransactions = async (filters = {}, token) => {
  try {
    if (!token) throw new Error('Токен отсутствует');

    // Временная работа с моковыми данными
    return mockData
      .filter((expense) =>
        filters.filterBy ? filters.filterBy.split(',').includes(expense.category) : true
      )
      .sort((a, b) => {
        if (filters.sortBy === 'date') {
          return parse(b.date, 'M-d-yyyy', new Date()) - parse(a.date, 'M-d-yyyy', new Date());
        } else if (filters.sortBy === 'sum') {
          return b.sum - a.sum;
        }
        return 0;
      });

    // Раскомментировать для реального API
    /*
    const response = await apiClient.get('/transactions', {
      params: {
        sortBy: filters.sortBy || undefined,
        filterBy: filters.filterBy || undefined,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
    */
  } catch (error) {
    console.error('Ошибка при загрузке транзакций:', error);
    throw error.response?.data?.error || 'Ошибка сервера';
  }
};

// Функция для удаления транзакции
export const deleteTransaction = async (id, token) => {
  try {
    if (!token) throw new Error('Токен отсутствует');

    // Временная работа с моковыми данными
    mockData = mockData.filter((item) => item._id !== id);
    return mockData;

    // Раскомментировать для реального API
    /*
    const response = await apiClient.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
    */
  } catch (error) {
    console.error('Ошибка при удалении транзакции:', error);
    throw error.response?.data?.error || 'Ошибка сервера';
  }
};

// Функция для получения транзакций за период
export const getTransactionsByPeriod = async (period, token) => {
  try {
    if (!token) throw new Error('Токен отсутствует');

    // Временная работа с моковыми данными
    const startDate = parse(period.start, 'M-d-yyyy', new Date());
    const endDate = parse(period.end, 'M-d-yyyy', new Date());
    return mockData.filter((expense) => {
      const expenseDate = parse(expense.date, 'M-d-yyyy', new Date());
      return expenseDate >= startDate && expenseDate <= endDate;
    });

    // Раскомментировать для реального API
    /*
    const response = await apiClient.post('/transactions/period', period, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
    */
  } catch (error) {
    console.error('Ошибка при загрузке транзакций за период:', error);
    throw error.response?.data?.error || 'Ошибка сервера';
  }
};