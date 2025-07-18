import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 375px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: "Montserrat", sans-serif;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline-offset: 2px;

  &:focus-visible {
    outline: 2px solid #1fa46c;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  outline-offset: 2px;

  &:focus-visible {
    outline: 2px solid #1fa46c;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "variant",
})`
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 1rem;
  color: ${(props) => (props.variant === "cancel" ? "#333" : "#fff")};
  background-color: ${(props) =>
    props.variant === "cancel" ? "#f4f5f6" : "#1fa46c"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#d9d9d9" : "#188a54"};
    outline: none;
  }
`;

const ExpenseFormMobile = ({ editData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    notes: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        amount: editData.amount || "",
        date: editData.date || "",
        category: editData.category || "",
        notes: editData.notes || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit} aria-label="Форма добавления/редактирования расхода">
      <div>
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="amount">Сумма</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min="0.01"
          step="0.01"
          required
          value={formData.amount}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="date">Дата</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="category">Категория</Label>
        <Input
          id="category"
          name="category"
          type="text"
          required
          value={formData.category}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="notes">Примечания</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <ButtonRow>
        <Button variant="cancel" type="button" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
      </ButtonRow>
    </FormContainer>
  );
};

export default ExpenseFormMobile;
