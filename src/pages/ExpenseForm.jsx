import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../components/CommonComponents.jsx";
import { InputWrapper } from "../components/inputs/SInput.styled.js";
import Input from "../components/inputs/Input.jsx";
import Button from "../components/buttons/Button.jsx";
import { ErrorStarContainer } from "../components/errors/SErrorContainer.styled.js";
import { categories } from "../constants/categories";

const FormTitle = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 100%;
  margin: 0.9375rem 0 1.25rem 1.25rem;
  color: #333;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0.625rem 0 0.9375rem 0.625rem;
  }
`;

const FieldLabel = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin: 1.25rem 0 1.25rem 1.25rem;
  color: #333;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin: 0.9375rem 0 0.9375rem 0.625rem;
  }
`;

const CategoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.9375rem;
  margin: 0.3125rem;
  border: none;
  border-radius: 1.875rem;
  background: #f4f5f6;
  color: #333;
  font-family: "Montserrat", sans-serif;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    margin-right: 0.375rem;
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

  @media (max-width: 768px) {
    padding: 0.375rem 0.625rem;
    font-size: 0.625rem;
    margin: 0.1875rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.25rem;

  @media (max-width: 768px) {
    gap: 0.3125rem;
    margin-top: 0.625rem;
  }
`;

// Компонент формы для добавления/редактирования расходов
const ExpenseForm = ({ editData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: "",
    categoryLabel: "",
    date: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [statusInputs, setStatusInputs] = useState({
    description: "default",
    date: "default",
    amount: "default",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Инициализация формы при редактировании
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id,
        description: editData.description,
        categoryLabel: editData.categoryLabel,
        date: editData.date,
        amount: editData.amount.toString(),
      });
      setStatusInputs({ description: "default", date: "default", amount: "default" });
      setErrors({});
      setIsSubmitted(false);
    } else {
      setFormData({ description: "", categoryLabel: "", date: "", amount: "" });
      setStatusInputs({ description: "default", date: "default", amount: "default" });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [editData]);

  // Валидация полей формы
  const validateField = (name, value) => {
    if (name === "description") {
      if (!value.trim()) return "Обязательно";
      if (value.trim().length < 4) return "Минимум 4 символа";
      return "";
    }
    if (name === "categoryLabel") {
      return value ? "" : "Обязательно";
    }
    if (name === "date") {
      return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value))
        ? ""
        : "Неверный формат";
    }
    if (name === "amount") {
      return !isNaN(value) && Number(value) > 0 ? "" : "Положительное число";
    }
    return "";
  };

  // Обработка изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setStatusInputs((prev) => ({
      ...prev,
      [name]: validateField(name, value) ? "default" : "error",
    }));
  };

  // Обработка выбора категории
  const handleCategorySelect = (categoryLabel) => {
    setFormData((prev) => ({ ...prev, categoryLabel }));
    setErrors((prev) => ({ ...prev, categoryLabel: "" }));
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = {
      description: validateField("description", formData.description),
      categoryLabel: validateField("categoryLabel", formData.categoryLabel),
      date: validateField("date", formData.date),
      amount: validateField("amount", formData.amount),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      const result = await onSubmit({
        ...formData,
        amount: parseInt(formData.amount, 10),
        category: categories.find((cat) => cat.label === formData.categoryLabel)?.value,
        formattedDate: formData.date,
      });
      if (result.success && !editData) {
        setFormData({ description: "", categoryLabel: "", date: "", amount: "" });
        setStatusInputs({ description: "default", date: "default", amount: "default" });
        setErrors({});
        setIsSubmitted(false);
      }
    }
  };

  // Проверка, активна ли кнопка
  const isButtonActive = Object.values(errors).every((error) => !error);

  return (
    <>
      <FormTitle>{editData ? "Редактирование" : "Новый расход"}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FieldLabel>Описание</FieldLabel>
        <InputWrapper>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Введите описание"
            statusInput={statusInputs.description}
          />
          {errors.description && isSubmitted && <ErrorStarContainer>*</ErrorStarContainer>}
        </InputWrapper>
        {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        <FieldLabel>Категории</FieldLabel>
        {categories
          .filter((cat) => cat.value !== "")
          .map((cat) => {
            const IconComponent = cat.icon;
            return (
              <CategoryButton
                key={cat.value}
                selected={formData.categoryLabel === cat.label}
                onClick={() => handleCategorySelect(cat.label)}
              >
                {IconComponent && <IconComponent />}
                {cat.label}
              </CategoryButton>
            );
          })}
        {errors.categoryLabel && isSubmitted && <ErrorStarContainer>*</ErrorStarContainer>}
        {errors.categoryLabel && <ErrorMessage>{errors.categoryLabel}</ErrorMessage>}
        <FieldLabel>Дата</FieldLabel>
        <InputWrapper>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Введите дату"
            statusInput={statusInputs.date}
          />
          {errors.date && isSubmitted && <ErrorStarContainer>*</ErrorStarContainer>}
        </InputWrapper>
        {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        <FieldLabel>Сумма</FieldLabel>
        <InputWrapper>
          <Input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            statusInput={statusInputs.amount}
          />
          {errors.amount && isSubmitted && <ErrorStarContainer>*</ErrorStarContainer>}
        </InputWrapper>
        {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
        {editData ? (
          <ButtonWrapper>
            <Button type="submit" isActive={isButtonActive}>
              Сохранить редактирование
            </Button>
            <Button isActive={true} onClick={onCancel}>
              Отмена
            </Button>
          </ButtonWrapper>
        ) : (
          <Button type="submit" isActive={isButtonActive}>
            Добавить новый расход
          </Button>
        )}
      </form>
    </>
  );
};

export default ExpenseForm;