import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import FilterControls from './FilterControls';

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
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Пятерочка', category: 'Еда', date: '2024-07-03T00:00:00.000Z', amount: 3500 },
    { id: 2, description: 'Яндекс Такси', category: 'Транспорт', date: '2024-07-03T00:00:00.000Z', amount: 730 },
    { id: 3, description: 'Аптека Вита', category: 'Другое', date: '2024-07-03T00:00:00.000Z', amount: 1200 },
    { id: 4, description: 'Бургер Кинг', category: 'Еда', date: '2024-07-03T00:00:00.000Z', amount: 950 },
    { id: 5, description: 'Деливери', category: 'Еда', date: '2024-07-02T00:00:00.000Z', amount: 1320 },
    { id: 6, description: 'Кофейня №1', category: 'Еда', date: '2024-07-02T00:00:00.000Z', amount: 400 },
    { id: 7, description: 'Билеты', category: 'Развлечения', date: '2024-06-29T00:00:00.000Z', amount: 600 },
    { id: 8, description: 'Перекресток', category: 'Еда', date: '2024-06-29T00:00:00.000Z', amount: 2360 },
    { id: 9, description: 'Лукойл', category: 'Транспорт', date: '2024-06-29T00:00:00.000Z', amount: 1000 },
    { id: 10, description: 'Летуаль', category: 'Другое', date: '2024-06-29T00:00:00.000Z', amount: 4300 },
    { id: 11, description: 'Яндекс Такси', category: 'Транспорт', date: '2024-06-28T00:00:00.000Z', amount: 320 },
    { id: 12, description: 'Перекресток', category: 'Еда', date: '2024-06-28T00:00:00.000Z', amount: 1360 },
    { id: 13, description: 'Деливери', category: 'Еда', date: '2024-06-28T00:00:00.000Z', amount: 2320 },
    { id: 14, description: 'Вкусвилл', category: 'Еда', date: '2024-06-27T00:00:00.000Z', amount: 1220 },
    { id: 15, description: 'Кофейня №1', category: 'Еда', date: '2024-06-27T00:00:00.000Z', amount: 920 },
    { id: 16, description: 'Вкусвилл', category: 'Еда', date: '2024-06-26T00:00:00.000Z', amount: 840 },
    { id: 17, description: 'Кофейня №1', category: 'Еда', date: '2024-06-26T00:00:00.000Z', amount: 920 },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editData, setEditData] = useState(null);

  const handleEdit = (expense) => {
    setSelectedId(expense.id);
    setEditData({ ...expense });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditData(null);
    }
  };

  const handleFormSubmit = (data) => {
    if (editData) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === data.id ? { ...data } : expense
        )
      );
      setSelectedId(null);
      setEditData(null);
    } else {
      setExpenses([...expenses, { ...data, id: Date.now() }]);
    }
  };

  const handleFormCancel = () => {
    setSelectedId(null);
    setEditData(null);
  };

  // Фильтрация и сортировка расходов
  const filteredAndSortedExpenses = expenses
    .filter((expense) => (
      filterCategory ? expense.category === filterCategory : true
    ))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
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