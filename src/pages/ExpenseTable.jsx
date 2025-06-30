import React from 'react';
import styled from 'styled-components';

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

const ActionButton = styled.button`
  margin: 0 5px;
  cursor: pointer;
  color: ${props => (props.selected || props.hovered) ? '#006400' : '#000'};
  background: none;
  border: none;
  font-size: inherit;
  transition: color 0.3s ease;
`;

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  return (
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
        {expenses.map(expense => (
          <TableRow key={expense.id} selected={expense.id === expense.id}>
            <TableCell selected={expense.id === expense.id}>{expense.description}</TableCell>
            <TableCell selected={expense.id === expense.id}>{expense.category}</TableCell>
            <TableCell selected={expense.id === expense.id}>
              {new Date(expense.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </TableCell>
            <TableCell selected={expense.id === expense.id}>{`${expense.amount} Р`}</TableCell>
            <TableCell>
              <ActionButton
                aria-label="edit"
                selected={expense.id === expense.id}
                onClick={() => onEdit(expense)}
              >
                ✏️
              </ActionButton>
              <ActionButton
                aria-label="delete"
                selected={expense.id === expense.id}
                onClick={() => onDelete(expense.id)}
              >
                🗑️
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;