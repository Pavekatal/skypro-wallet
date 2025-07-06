import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FoodIcon, TransportIcon, HousingIcon, EntertainmentIcon, EducationIcon, OtherIcon } from '../components/Icons.jsx';
import { Input, Button, ErrorMessage } from '../components/CommonComponents.jsx';

// Стили для заголовка формы
const FormTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  margin: 15px 0 20px 20px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
`;

// Стили для заголовков полей (включая "Категории")
const FieldLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin: 20px 0 20px 20px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
`;

// Стили для кнопок категорий
const CategoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  margin: 5px;
  border: none;
  border-radius: 30px;
  background: #F4F5F6;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  svg {
    margin-right: 6px;
  }
  &:hover {
    background: #e0e0e0;
  }
  ${({ selected }) =>
    selected &&
    `
      background: #DBFFE9;
      color: #1FA46C;
      svg path {
        fill: #1FA46C;
      }
      &:hover {
        background: #C1FFD6;
      }
    `}
`;

const ExpenseForm = ({ editData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    date: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id || undefined,
        description: editData.description || '',
        category: editData.category || '',
        date: editData.date || '',
        amount: editData.amount || ''
      });
    } else {
      setFormData({ description: '', category: '', date: '', amount: '' });
    }
  }, [editData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    if (!formData.category) newErrors.category = 'Категория обязательна';
    if (!formData.date) newErrors.date = 'Дата обязательна';
    if (formData.amount && isNaN(formData.amount)) newErrors.amount = 'Сумма должна быть числом';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setErrors({ ...errors, category: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        amount: formData.amount ? parseFloat(formData.amount) : 0,
        date: new Date(formData.date).toISOString()
      });
    } else {
      setErrors(newErrors);
    }
  };

  const isValidInput = (value, field) => {
    if (field === 'description') return value.trim() !== '';
    if (field === 'date') return value !== '';
    if (field === 'amount') return !value || !isNaN(value);
    return false;
  };

  const categories = [
    { name: 'Еда', icon: <FoodIcon /> },
    { name: 'Транспорт', icon: <TransportIcon /> },
    { name: 'Жилье', icon: <HousingIcon /> },
    { name: 'Развлечения', icon: <EntertainmentIcon /> },
    { name: 'Образование', icon: <EducationIcon /> },
    { name: 'Другое', icon: <OtherIcon /> },
  ];

  return (
    <>
      <FormTitle>{editData ? 'Редактирование' : 'Новый расход'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FieldLabel>Описание</FieldLabel>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Введите описание"
          $valid={isValidInput(formData.description, 'description')}
        />
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        <FieldLabel>Категории</FieldLabel>
        {categories.map((cat) => (
          <CategoryButton
            key={cat.name}
            selected={formData.category === cat.name}
            onClick={() => handleCategorySelect(cat.name)}
          >
            {cat.icon}
            {cat.name}
          </CategoryButton>
        ))}
        {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        <FieldLabel>Дата</FieldLabel>
        <Input
          type="date"
          name="date"
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          placeholder="Введите дату"
          $valid={isValidInput(formData.date, 'date')}
        />
        {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        <FieldLabel>Сумма</FieldLabel>
        <Input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Введите сумму"
          $valid={isValidInput(formData.amount, 'amount')}
        />
        {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
        <Button type="submit" $variant="primary" $fullWidth>
          {editData ? 'Сохранить редактирование' : 'Добавить новый расход'}
        </Button>
        {editData && (
          <Button $variant="secondary" $fullWidth onClick={onCancel}>
            Отмена
          </Button>
        )}
      </form>
    </>
  );
};

export default ExpenseForm;