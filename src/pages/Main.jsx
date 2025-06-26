import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
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

const TableSection = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 10px;
  background: #f0f0f0;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) { background: #fafafa; }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const FormSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.valid ? '#006400' : '#ddd'};
  border-radius: 4px;
  background: ${props => props.valid ? '#90EE90' : 'transparent'};
  font-family: 'Montserrat', sans-serif;
  transition: all 0.3s ease;
`;

const FormSelect = styled.select`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  background: ${props => props.selected ? '#00C853' : 'transparent'};
  color: ${props => props.selected ? '#fff' : '#000'};
  &:after {
    content: ${props => props.selected ? '"✓"' : '""'};
    margin-left: 5px;
    color: #fff;
  }
`;

const FilterSelect = styled.select`
  padding: 5px 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.selected ? '#00C853' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#000'};
  font-family: 'Montserrat', sans-serif;
`;

const SortSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.selected ? '#00C853' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#000'};
  font-family: 'Montserrat', sans-serif;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #00C853;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  cursor: pointer;
`;

const ActionIcons = styled.span`
  margin: 0 5px;
  cursor: pointer;
`;

const MainPage = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Пятерочка', category: 'Еда', date: '03.07.2024', amount: '3 500 Р' },
    { id: 2, description: 'Яндекс Такси', category: 'Транспорт', date: '03.07.2024', amount: '730 Р' },
    { id: 3, description: 'Аптека Витя', category: 'Другое', date: '03.07.2024', amount: '1 200 Р' },
    { id: 4, description: 'Бургер Кинг', category: 'Еда', date: '03.07.2024', amount: '950 Р' },
    { id: 5, description: 'Деливери', category: 'Еда', date: '02.07.2024', amount: '1 320 Р' },
    { id: 6, description: 'Кофейня №1', category: 'Еда', date: '02.07.2024', amount: '400 Р' },
    { id: 7, description: 'Билеты', category: 'Развлечения', date: '29.06.2024', amount: '600 Р' },
    { id: 8, description: 'Перекресток', category: 'Еда', date: '29.06.2024', amount: '2 360 Р' },
    { id: 9, description: 'Лукойл', category: 'Транспорт', date: '29.06.2024', amount: '1 000 Р' },
    { id: 10, description: 'Летуаль', category: 'Другое', date: '29.06.2024', amount: '4 300 Р' },
    { id: 11, description: 'Яндекс Такси', category: 'Транспорт', date: '28.06.2024', amount: '320 Р' },
    { id: 12, description: 'Перекресток', category: 'Еда', date: '28.06.2024', amount: '1 360 Р' },
    { id: 13, description: 'Деливери', category: 'Еда', date: '28.06.2024', amount: '2 320 Р' },
    { id: 14, description: 'Вкусвилл', category: 'Еда', date: '27.06.2024', amount: '1 220 Р' },
    { id: 15, description: 'Кофейня №1', category: 'Еда', date: '27.06.2024', amount: '920 Р' },
    { id: 16, description: 'Вкусвилл', category: 'Еда', date: '26.06.2024', amount: '840 Р' },
    { id: 17, description: 'Кофейня №1', category: 'Еда', date: '26.06.2024', amount: '920 Р' },
  ]);
   const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    date: '',
    amount: ''
  });

  useEffect(() => {
    let filteredExpenses = [...expenses]; // Create a copy to avoid direct mutation
    if (filterCategory) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === filterCategory);
    }
    if (sortBy === 'date') {
      filteredExpenses.sort((a, b) => new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-')));
    } else if (sortBy === 'amount') {
      filteredExpenses.sort((a, b) => parseInt(a.amount.replace(' Р', '')) - parseInt(b.amount.replace(' Р', '')));
    }
    // No need to setExpenses here; use filteredExpenses for display
  }, [filterCategory, sortBy]);

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidInput = (value, field) => {
    if (field === 'amount') return value && !isNaN(value) && parseInt(value) > 0;
    return value.trim() !== '';
  };

  return (
    <>
      <Header currentPath="/" />
      <Container>
        <ContentWrapper>
          <TableSection>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Таблица расходов</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <FilterSelect
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                selected={filterCategory !== ''}
              >
                <option value="">Фильтровать по категории</option>
                <option value="Еда">Еда</option>
                <option value="Транспорт">Транспорт</option>
                <option value="Жилье">Жилье</option>
                <option value="Развлечения">Развлечения</option>
                <option value="Образование">Образование</option>
                <option value="Другое">Другое</option>
              </FilterSelect>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                selected={sortBy !== ''}
              >
                <option value="">Сортировать по</option>
                <option value="date">По дате</option>
                <option value="amount">По сумме</option>
              </SortSelect>
            </div>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Описание</TableHeader>
                  <TableHeader>Категория</TableHeader>
                  <TableHeader>Дата</TableHeader>
                  <TableHeader>Сумма</TableHeader>
                  <TableHeader>Действия</TableHeader>
                </tr>
              </thead>
              <tbody>
                {expenses
                  .filter(expense => !filterCategory || expense.category === filterCategory)
                  .sort((a, b) => {
                    if (sortBy === 'date') return new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-'));
                    if (sortBy === 'amount') return parseInt(a.amount.replace(' Р', '')) - parseInt(b.amount.replace(' Р', ''));
                    return 0;
                  })
                  .map(expense => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>
                      <ActionIcons role="img" aria-label="edit" onClick={() => window.location.href = `/spending/${expense.id}`}>✏️</ActionIcons>
                      <ActionIcons role="img" aria-label="delete" onClick={() => handleDelete(expense.id)}>🗑️</ActionIcons>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableSection>
          <FormSection>
            <FormTitle>Новый расход</FormTitle>
            <FormInput
              name="description"
              placeholder="Введите описание"
              value={formData.description}
              onChange={handleInputChange}
              valid={isValidInput(formData.description, 'description')}
            />
            <FormSelect
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              selected={formData.category !== ''}
            >
              <option value="">Выберите категорию</option>
              <option value="Еда">Еда</option>
              <option value="Транспорт">Транспорт</option>
              <option value="Жилье">Жилье</option>
              <option value="Развлечения">Развлечения</option>
              <option value="Образование">Образование</option>
              <option value="Другое">Другое</option>
            </FormSelect>
            <FormInput
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              valid={isValidInput(formData.date, 'date')}
            />
            <FormInput
              name="amount"
              placeholder="Введите сумму"
              value={formData.amount}
              onChange={handleInputChange}
              valid={isValidInput(formData.amount, 'amount')}
            />
            <FormButton onClick={() => window.location.href = '/spending/new'}>Добавить новый расход</FormButton>
          </FormSection>
        </ContentWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default MainPage;