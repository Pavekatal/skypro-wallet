import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import FilterControls from './FilterControls';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: #f5f5f5;
  min-height: 100vh;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainTitle = styled.h2`
  font-size: 36px;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
  font-family: 'Montserrat', sans-serif;
  background: transparent;
`;

const MainPage = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Пятерочка', category: 'Еда', date: '2024-07-03T00:00:00.000Z', amount: 3500 },
    { id: 2, description: 'Яндекс Такси', category: 'Транспорт', date: '2024-07-03T00:00:00.000Z', amount: 730 },
    { id: 3, description: 'Аптека Витя', category: 'Другое', date: '2024-07-03T00:00:00.000Z', amount: 1200 },
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
    setExpenses(expenses.filter(expense => expense.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditData(null);
    }
  };

  const handleFormSubmit = (data) => {
    if (editData) {
      setExpenses(expenses.map(expense =>
        expense.id === data.id ? { ...data } : expense
      ));
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

  return (
    <>
      <Header currentPath="/" />
      <MainTitle>Мои расходы</MainTitle>
      <Container>
        <ContentWrapper>
          <TableSection>
            <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
            <FilterControls
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </TableSection>
          <FormSection>
            <ExpenseForm
              editData={editData}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </FormSection>
        </ContentWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default MainPage;