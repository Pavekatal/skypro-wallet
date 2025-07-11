import React from "react";
import styled from "styled-components";
import { EditIcon, DeleteIcon } from "../components/Icons";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 1.25rem;

  @media (max-width: 768px) {
    display: none; // Скрываем таблицу на мобильных
  }
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  border-bottom: 0.125rem solid #ddd;
  font-weight: 400;
  font-size: 0.75rem;
  color: #999999;
  font-family: "Montserrat", sans-serif;

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.625rem;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #ffffff;
  }
  &:hover {
    background: #e6f3e6;
  }
  ${({ active }) =>
    active &&
    `
      background: #DBFFE9 !important;
    `}
  transition: background 0.3s ease;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  font-size: 0.75rem;
  border-bottom: 0.0625rem solid #eee;
  color: #000000;
  font-family: "Montserrat", sans-serif;
  transition: color 0.3s ease;
`;

const ActionButton = styled.button`
  margin: 0 0.3125rem;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  ${({ active }) =>
    active &&
    `
      svg path {
        fill: #1A7F50;
      }
    `}

  &:hover svg {
    fill: #1FA46C;
  }
`;

const CardContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-top: 1.25rem;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 0.625rem;
  padding: 0.625rem;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  ${({ active }) =>
    active &&
    `
      background: #DBFFE9 !important;
    `}

  &:hover {
    background: #e6f3e6;
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3125rem 0;
  font-size: 0.75rem;
  color: #333;
  font-family: "Montserrat", sans-serif;
`;

const CardLabel = styled.span`
  font-weight: 600;
`;

const CardValue = styled.span`
  color: #000000;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.625rem;
  padding-top: 0.625rem;
`;

// Компонент таблицы расходов с карточным макетом для мобильных
const ExpenseTable = ({ expenses, onEdit, onDelete, activeExpenseId }) => (
  <>
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
        {expenses.length === 0 ? (
          <tr>
            <TableCell colSpan="5">Нет данных</TableCell>
          </tr>
        ) : (
          expenses.map((expense) => (
            <TableRow key={expense.id} active={expense.id === activeExpenseId}>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.categoryLabel}</TableCell>
              <TableCell>{expense.formattedDate}</TableCell>
              <TableCell>{`${expense.amount.toLocaleString("ru-RU")} ₽`}</TableCell>
              <TableCell>
                <ActionButton
                  onClick={() => onEdit(expense)}
                  active={expense.id === activeExpenseId}
                >
                  <EditIcon />
                </ActionButton>
                <ActionButton
                  onClick={() => onDelete(expense.id)}
                  active={expense.id === activeExpenseId}
                >
                  <DeleteIcon />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </tbody>
    </Table>
    <CardContainer>
      {expenses.length === 0 ? (
        <CardRow>Нет данных</CardRow>
      ) : (
        expenses.map((expense) => (
          <Card key={expense.id} active={expense.id === activeExpenseId}>
            <CardRow>
              <CardLabel>Описание:</CardLabel>
              <CardValue>{expense.description}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Категория:</CardLabel>
              <CardValue>{expense.categoryLabel}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Дата:</CardLabel>
              <CardValue>{expense.formattedDate}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Сумма:</CardLabel>
              <CardValue>{`${expense.amount.toLocaleString("ru-RU")} ₽`}</CardValue>
            </CardRow>
            <CardActions>
              <ActionButton
                onClick={() => onEdit(expense)}
                active={expense.id === activeExpenseId}
              >
                <EditIcon />
              </ActionButton>
              <ActionButton
                onClick={() => onDelete(expense.id)}
                active={expense.id === activeExpenseId}
              >
                <DeleteIcon />
              </ActionButton>
            </CardActions>
          </Card>
        ))
      )}
    </CardContainer>
  </>
);

export default ExpenseTable;