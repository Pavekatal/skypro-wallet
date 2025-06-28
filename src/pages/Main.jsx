import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

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

const TableSection = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 600px;
  max-width: 70%;
`;

const FormSection = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 30%;
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
  &:hover { background: #90EE90; }
  background: ${props => props.selected ? '#90EE90' : 'transparent'};
  transition: background 0.3s ease;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: ${props => (props.selected || props.hovered) ? '#006400' : '#000'};
  transition: color 0.3s ease;
`;

const MainTitle = styled.h2`
  font-size: 36px; /* Twice the size of TableSection h2 (18px) */
  text-align: left; /* Align left */
  margin-bottom: 20px;
  margin-top: 20px; /* Space after header */
  margin-left: 20px; /* Offset from left edge */
  font-family: 'Montserrat', sans-serif;
  background: transparent; /* No background color */
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left; /* Align left */
  margin: 0 0 0 20px; /* Offset from left edge */
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.valid ? '#006400' : '#ddd'};
  border-radius: 4px;
  background: ${props => (props.valid && props.editing) ? '#fff' : (props.valid ? '#90EE90' : 'transparent')};
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
  background: ${props => (props.selected && props.editing) ? '#fff' : (props.selected ? '#00C853' : 'transparent')};
  color: ${props => (props.selected && props.editing) ? '#000' : (props.selected ? '#fff' : '#000')};
  &:after {
    content: ${props => props.selected ? '"✓"' : '""'};
    margin-left: 5px;
    color: ${props => (props.selected && props.editing) ? '#000' : '#fff'};
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
  margin-top: 10px;
`;

const ActionIcons = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: ${props => (props.selected || props.hovered) ? '#006400' : '#000'};
  transition: color 0.3s ease;
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
    { id: 14, description: 'Вкусивли', category: 'Еда', date: '27.06.2024', amount: '1 220 Р' },
    { id: 15, description: 'Кофейня №1', category: 'Еда', date: '27.06.2024', amount: '920 Р' },
    { id: 16, description: 'Вкусивли', category: 'Еда', date: '26.06.2024', amount: '840 Р' },
    { id: 17, description: 'Кофейня №1', category: 'Еда', date: '26.06.2024', amount: '920 Р' },
  ]);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [newExpense, setNewExpense] = useState({
    description: '',
    category: '',
    date: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updatedExpense) {
      const updatedExpense = location.state.updatedExpense;
      const dateParts = new Date(updatedExpense.date).toLocaleDateString('ru-RU').split('.');
      const formattedDate = `${dateParts[0].padStart(2, '0')}.${dateParts[1].padStart(2, '0')}.${dateParts[2]}`;
      setExpenses(expenses.map(expense =>
        expense.id === parseInt(updatedExpense.id)
          ? { ...expense, description: updatedExpense.description, category: updatedExpense.category, date: formattedDate, amount: updatedExpense.amount + ' Р' }
          : expense
      ));
      setSelectedId(null);
      setEditData(null);
      window.history.replaceState({}, document.title);
    }
    if (location.state?.newExpense) {
      // Convert date to DD.MM.YYYY format
      const dateParts = new Date(location.state.newExpense.date).toLocaleDateString('ru-RU').split('.');
      const formattedDate = `${dateParts[0].padStart(2, '0')}.${dateParts[1].padStart(2, '0')}.${dateParts[2]}`;
      setExpenses([...expenses, { ...location.state.newExpense, date: formattedDate, id: Date.now() }]);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let filteredExpenses = [...expenses];
    if (filterCategory) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === filterCategory);
    }
    if (sortBy === 'date') {
      filteredExpenses.sort((a, b) => new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-')));
    } else if (sortBy === 'amount') {
      filteredExpenses.sort((a, b) => parseInt(a.amount.replace(' Р', '')) - parseInt(b.amount.replace(' Р', '')));
    }
  }, [filterCategory, sortBy]);

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditData(null);
    }
  };

  const handleEdit = (expense) => {
    setSelectedId(expense.id);
    setEditData({ ...expense, amount: expense.amount.replace(' Р', '') });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData({ ...editData, [name]: value });
    } else {
      setNewExpense({ ...newExpense, [name]: value });
      setErrors({ ...errors, [name]: '' }); // Clear errors on change
    }
  };

  const handleSaveEdit = () => {
    if (editData) {
      // Convert date to DD.MM.YYYY format
      const dateParts = new Date(editData.date).toLocaleDateString('ru-RU').split('.');
      const formattedDate = `${dateParts[0].padStart(2, '0')}.${dateParts[1].padStart(2, '0')}.${dateParts[2]}`;
      const updatedExpenses = expenses.map(expense =>
        expense.id === editData.id
          ? { ...expense, description: editData.description, category: editData.category, date: formattedDate, amount: editData.amount + ' Р' }
          : expense
      );
      setExpenses(updatedExpenses);
      setSelectedId(null);
      setEditData(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newExpense.description.trim()) newErrors.description = 'Описание обязательно';
    if (!newExpense.category) newErrors.category = 'Категория обязательна';
    if (!newExpense.date) newErrors.date = 'Дата обязательна';
    if (newExpense.amount && isNaN(newExpense.amount)) newErrors.amount = 'Сумма должна быть числом';
    return newErrors;
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const dateParts = new Date(newExpense.date).toLocaleDateString('ru-RU').split('.');
      const formattedDate = `${dateParts[0].padStart(2, '0')}.${dateParts[1].padStart(2, '0')}.${dateParts[2]}`;
      const newExpenseEntry = {
        id: Date.now(),
        description: newExpense.description,
        category: newExpense.category,
        date: formattedDate,
        amount: `${newExpense.amount || 0} Р` 
      };
      setExpenses([...expenses, newExpenseEntry]);
      setNewExpense({ description: '', category: '', date: '', amount: '' }); // Reset form
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const isValidInput = (value, field) => {
    if (field === 'amount') return !value || !isNaN(value); 
    return value.trim() !== '';
  };

  return (
    <>
      <Header currentPath="/" />
      <MainTitle>Мои расходы</MainTitle>
      <Container>
        <ContentWrapper>
          <TableSection>
            <h2 style={{ textAlign: 'left', marginBottom: '20px', marginLeft: '20px' }}>Таблица расходов</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginLeft: '20px', marginRight: '20px' }}>
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
                    <TableRow
                      key={expense.id}
                      selected={selectedId === expense.id}
                    >
                      <TableCell selected={selectedId === expense.id}>{expense.description}</TableCell>
                      <TableCell selected={selectedId === expense.id}>{expense.category}</TableCell>
                      <TableCell selected={selectedId === expense.id}>{expense.date}</TableCell>
                      <TableCell selected={selectedId === expense.id}>{expense.amount}</TableCell>
                      <TableCell>
                        <ActionIcons
                          role="img"
                          aria-label="edit"
                          selected={selectedId === expense.id}
                          onClick={() => handleEdit(expense)}
                        >
                          ✏️
                        </ActionIcons>
                        <ActionIcons
                          role="img"
                          aria-label="delete"
                          selected={selectedId === expense.id}
                          onClick={() => handleDelete(expense.id)}
                        >
                          🗑️
                        </ActionIcons>
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
          </TableSection>
          <FormSection>
            {!editData && (
              <>
                <FormTitle>Новый расход</FormTitle>
                <form onSubmit={handleAddExpense}>
                  <FormInput
                    name="description"
                    value={newExpense.description}
                    onChange={handleEditChange}
                    placeholder="Введите описание"
                    valid={isValidInput(newExpense.description, 'description')}
                  />
                  {errors.description && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.description}</p>}
                  <FormSelect
                    name="category"
                    value={newExpense.category}
                    onChange={handleEditChange}
                    selected={newExpense.category !== ''}
                  >
                    <option value="">Выберите категорию</option>
                    <option value="Еда">Еда</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Жилье">Жилье</option>
                    <option value="Развлечения">Развлечения</option>
                    <option value="Образование">Образование</option>
                    <option value="Другое">Другое</option>
                  </FormSelect>
                  {errors.category && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.category}</p>}
                  <FormInput
                    type="date"
                    name="date"
                    value={newExpense.date}
                    onChange={handleEditChange}
                    valid={isValidInput(newExpense.date, 'date')}
                  />
                  {errors.date && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.date}</p>}
                  <FormInput
                    name="amount"
                    value={newExpense.amount}
                    onChange={handleEditChange}
                    placeholder="Введите сумму"
                    valid={isValidInput(newExpense.amount, 'amount')}
                  />
                  {errors.amount && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.amount}</p>}
                  <FormButton type="submit">Добавить новый расход</FormButton>
                </form>
              </>
            )}
            {editData && (
              <>
                <FormTitle>Редактирование расхода</FormTitle>
                <FormInput
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  placeholder="Введите описание"
                  valid={isValidInput(editData.description, 'description')}
                  editing={true}
                />
                <FormSelect
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  selected={editData.category !== ''}
                  editing={true}
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
                  value={editData.date}
                  onChange={handleEditChange}
                  valid={isValidInput(editData.date, 'date')}
                  editing={true}
                />
                <FormInput
                  name="amount"
                  value={editData.amount}
                  onChange={handleEditChange}
                  placeholder="Введите сумму"
                  valid={isValidInput(editData.amount, 'amount')}
                  editing={true}
                />
                <FormButton onClick={handleSaveEdit}>Сохранить редактирование</FormButton>
                <FormButton onClick={() => { setSelectedId(null); setEditData(null); }}>Отмена</FormButton>
              </>
            )}
          </FormSection>
        </ContentWrapper>
        <Outlet />
      </Container>
    </>
  );
};

export default MainPage;