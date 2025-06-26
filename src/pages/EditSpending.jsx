import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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
  border: 1px solid ${props => props.error ? '#ff4444' : '#ddd'};
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
`;

const FormSelect = styled.select`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background: ${props => props.delete ? '#ff4444' : '#00C853'};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const EditSpendingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    date: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const sampleData = {
      '1': { description: 'Петрошка', category: 'Еда', date: '2024-07-03', amount: '3500' },
      '2': { description: 'Яндекс Такси', category: 'Транспорт', date: '2024-07-03', amount: '730' }
      // ... (expand with all expenses)
    };
    if (sampleData[id]) {
      setFormData(sampleData[id]);
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Описание обязательно';
    if (!formData.category) newErrors.category = 'Категория обязательна';
    if (!formData.date) newErrors.date = 'Дата обязательна';
    if (!formData.amount || isNaN(formData.amount)) newErrors.amount = 'Сумма обязательна и должна быть числом';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Expense updated:', formData);
      navigate('/');
    } else {
      setErrors(newErrors);
    }
  };

  const handleDelete = () => {
    console.log('Expense deleted:', id);
    navigate('/');
  };

  return (
    <>
      <Header currentPath={`/spending/${id}`} />
      <Container>
        <FormWrapper>
          <FormTitle>Редактирование</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormInput
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание"
              error={errors.description}
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
            <FormSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Выберите категорию</option>
              <option value="Еда">Еда</option>
              <option value="Транспорт">Транспорт</option>
              <option value="Развлечения">Развлечения</option>
              <option value="Другое">Другое</option>
            </FormSelect>
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
            <FormInput
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />
            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
            <FormInput
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Введите сумму"
              error={errors.amount}
            />
            {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
            <ButtonGroup>
              <FormButton type="submit">Сохранить</FormButton>
              <FormButton type="button" delete onClick={handleDelete}>Удалить</FormButton>
            </ButtonGroup>
          </form>
        </FormWrapper>
      </Container>
    </>
  );
};

export default EditSpendingPage;