import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import FilterControls from './FilterControls';
import { getTransactions, addOrUpdateTransaction, deleteTransaction } from '../components/api/transactions'; // Без .js
import { AuthContext } from '../context/AuthContext';
import { format, parse } from 'date-fns';

// Маппинг категорий для UI
const categoryMap = {
  Food: 'Еда',
  Transport: 'Транспорт',
  Entertainment: 'Развлечения',
  Others: 'Другое',
};

// Обратный маппинг для API
const reverseCategoryMap = {
  Еда: 'Food',
  Транспорт: 'Transport',
  Развлечения: 'Entertainment',
  Другое: 'Others',
};

// Стили для главного контейнера
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: #f5f5f5;
  min-height: calc(100vh - 64px);
  width: 100%;
`;

// Обертка содержимого
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Новый блок для заголовка и таблицы
const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Заголовок страницы "Мои расходы"
const MainTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #000000;
  padding: 5px 10px;
  border-radius: 8px;
  line-height: 150%;
  margin-bottom: 20px;
`;

// Новый блок для таблицы и формы
const TableAndFormWrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Секция таблицы
const TableSection = styled.div`
  flex: 2;
  background: #ffffff;
  border-radius: 30px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 789px;
  max-width: 789px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 100%;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-track {
    background: #d9d9d9;
  }
  &::-webkit-scrollbar-thumb {
    background: #bbbbbb;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b0b0b0;
  }
`;

// Заголовок таблицы
const TableTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #000000;
  margin-bottom: 20px;
`;

// Стили для секции формы
const FormSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 30%;
`;

// Обертка для заголовка и фильтров
const TableControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const MainPage = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editData, setEditData] = useState(null);

  // Загрузка транзакций с сервера
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.token) {
        toast.error('Токен отсутствует, пожалуйста, войдите в систему');
        return;
      }
      try {
        const data = await getTransactions(
          { sortBy, filterBy: filterCategory },
          user.token
        );
        setExpenses(
          data.map((item) => ({
            ...item,
            id: item._id, // Для ExpenseTable
            amount: item.sum, // Для ExpenseTable
            description: item.description, // Явное указание
            date: parse(item.date, 'M-d-yyyy', new Date()), // Парсим M-D-YYYY
            displayDate: format(parse(item.date, 'M-d-yyyy', new Date()), 'dd.MM.yyyy'), // Для UI
            displayCategory: categoryMap[item.category] || item.category, // Русская категория
          }))
        );
      } catch (error) {
        console.error('Ошибка при загрузке транзакций:', error);
        toast.error(error || 'Ошибка при загрузке транзакций');
        setExpenses([]); // Пустой массив при ошибке
      }
    };
    fetchTransactions();
  }, [filterCategory, sortBy, user?.token]);

  // Обработка редактирования
  const handleEdit = (expense) => {
    setSelectedId(expense._id);
    setEditData({
      ...expense,
      _id: expense._id,
      sum: expense.sum,
      description: expense.description,
      date: format(new Date(expense.date), 'M-d-yyyy'), // Для API
      displayDate: format(new Date(expense.date), 'dd.MM.yyyy'), // Для UI
      displayCategory: categoryMap[expense.category] || expense.category, // Русская категория
      category: expense.category, // Английская для API
    });
  };

  // Обработка удаления
  const handleDelete = async (id) => {
    if (!user?.token) return;
    try {
      const updatedList = await deleteTransaction(id, user.token);
      setExpenses(
        updatedList.map((item) => ({
          ...item,
          id: item._id,
          amount: item.sum,
          description: item.description,
          date: parse(item.date, 'M-d-yyyy', new Date()),
          displayDate: format(parse(item.date, 'M-d-yyyy', new Date()), 'dd.MM.yyyy'),
          displayCategory: categoryMap[item.category] || item.category,
        }))
      );
      if (selectedId === id) {
        setSelectedId(null);
        setEditData(null);
      }
    } catch (error) {
      console.error('Ошибка при удалении транзакции:', error);
      toast.error(error || 'Ошибка при удалении транзакции');
    }
  };

  // Обработка отправки формы
  const handleFormSubmit = async (data) => {
    if (!user?.token) return;
    try {
      const formattedData = {
        ...data,
        _id: data._id || undefined,
        sum: Number(data.sum),
        description: data.description,
        category: reverseCategoryMap[data.displayCategory] || data.category, // Русская → Английская
        date: format(parse(data.displayDate, 'dd.MM.yyyy', new Date()), 'M-d-yyyy'), // UI → API
      };
      const updatedList = await addOrUpdateTransaction(formattedData, user.token);
      setExpenses(
        updatedList.map((item) => ({
          ...item,
          id: item._id,
          amount: item.sum,
          description: item.description,
          date: parse(item.date, 'M-d-yyyy', new Date()),
          displayDate: format(parse(item.date, 'M-d-yyyy', new Date()), 'dd.MM.yyyy'),
          displayCategory: categoryMap[item.category] || item.category,
        }))
      );
      setSelectedId(null);
      setEditData(null);
    } catch (error) {
      console.error('Ошибка при сохранении транзакции:', error);
      toast.error(error || 'Ошибка при сохранении транзакции');
    }
  };

  // Обработка отмены редактирования
  const handleFormCancel = () => {
    setSelectedId(null);
    setEditData(null);
  };

  // Фильтрация и сортировка расходов
  const filteredAndSortedExpenses = expenses
    .filter((expense) =>
      filterCategory
        ? filterCategory.split(',').includes(expense.category)
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.date - a.date;
      } else if (sortBy === 'sum') {
        return b.sum - a.sum;
      }
      return 0;
    });

  return (
    <>
      <Header currentPath="/" />
      <Container>
        <ContentWrapper>
          <MainContent>
            <MainTitle>Мои расходы</MainTitle>
            <TableAndFormWrapper>
              <TableSection>
                <TableControlsWrapper>
                  <TableTitle>Таблица расходов</TableTitle>
                  <FilterControls
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </TableControlsWrapper>
                <ExpenseTable
                  expenses={filteredAndSortedExpenses}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </TableSection>
              <FormSection>
                <ExpenseForm
                  editData={editData}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </FormSection>
            </TableAndFormWrapper>
          </MainContent>
        </ContentWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default MainPage;