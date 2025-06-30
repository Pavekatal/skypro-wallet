import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
  margin: 0 0 0 20px;
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
        id: editData.id,
        description: editData.description,
        category: editData.category,
        date: editData.date,
        amount: editData.amount
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
    if (field === 'amount') return !value || !isNaN(value);
    return value.trim() !== '';
  };

  return (
    <>
      <FormTitle>{editData ? 'Редактирование расхода' : 'Новый расход'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Введите описание"
          valid={isValidInput(formData.description, 'description')}
          editing={!!editData}
        />
        {errors.description && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.description}</p>}
        <FormSelect
          name="category"
          value={formData.category}
          onChange={handleChange}
          selected={formData.category !== ''}
          editing={!!editData}
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
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          valid={isValidInput(formData.date, 'date')}
          editing={!!editData}
        />
        {errors.date && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.date}</p>}
        <FormInput
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Введите сумму"
          valid={isValidInput(formData.amount, 'amount')}
          editing={!!editData}
        />
        {errors.amount && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.amount}</p>}
        <FormButton type="submit">{editData ? 'Сохранить редактирование' : 'Добавить новый расход'}</FormButton>
        {editData && <FormButton onClick={onCancel}>Отмена</FormButton>}
      </form>
    </>
  );
};

export default ExpenseForm;